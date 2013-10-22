{-# LANGUAGE OverloadedStrings #-}
module HtmlChordParser (chordsFromUrl) where

import Text.Parsec
import Text.Parsec.String (Parser)
import Text.Parsec.Combinator 
import Text.Parsec.Char

import Hasmt.ChordParser

import Network.HTTP.Conduit (simpleHttp)
import qualified Data.Text as T
import Text.HTML.DOM (parseLBS)
import Text.XML.Cursor (Cursor, attributeIs, content, element, 
            fromDocument, child, descendant, ($//), (&|), (&//), (>=>))

import qualified Data.ByteString.Lazy.Char8 as L

url = "http://www.guitaretab.com/a/animals/538.html"

findNodes :: Cursor -> [Cursor]
findNodes = element "pre" >=> descendant

extractData = T.concat . content

dataToString = T.unpack . T.concat

processData = putStrLn . dataToString

cursorFor :: String -> IO Cursor
cursorFor u = do
    page <- simpleHttp u
    return $ fromDocument $ parseLBS page

main' = do
    cursor <- cursorFor url
    processData $ cursor $// findNodes &| extractData

main = L.putStrLn =<< simpleHttp url

chordsFromUrl url = do
    cursor <- cursorFor url
    return $ (junkStringToChords . dataToString) $ cursor $// findNodes &| extractData


