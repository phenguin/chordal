{-# LANGUAGE OverloadedStrings #-}
module Main where

import           Control.Applicative
import           Control.Monad
import           Snap.Core
import           Snap.Util.FileServe
import           Snap.Extras.JSON
import           Snap.Http.Server
import           Interface
import           Text.Read
import           Debug.Trace
import           Hasmt.Fretboard
import           Hasmt.ChordParser
import qualified Data.ByteString.Char8 as BS

main :: IO ()
main = quickHttpServe site

site :: Snap ()
site =
    ifTop (serveFile "./static/app/index.html") <|>
    route [ ("foo", writeBS "bar")
          , ("echo/:echoparam", echoHandler)
          , ("api/chord_notes", chordNotesHandler)
          , ("api/voicing_in_range", voicingInRangeHandler)
          , ("api/parse_chord", parseHandler)
          ] <|>
    dir "static" (serveDirectory "./static")

echoHandler :: Snap ()
echoHandler = do
    param <- getParam "echoparam"
    maybe (writeBS "must specify echo/param in URL")
          writeBS param

chordNotesHandler :: Snap ()
chordNotesHandler = do
    noteS <- (liftM . liftM) BS.unpack $ getParam "note"
    chordTypeS <- (liftM . liftM) BS.unpack $ getParam "chordType"
    tuningS <- (liftM . liftM) BS.unpack $ getParam "tuning"
    let mFrets = do
            tuning <- tuningS >>= tuningFromString
            note <- noteS >>= readMaybe
            chordType <- chordTypeS >>= chordFromString
            return $ fretsForChord tuning note chordType
        mResp = liftM Frets mFrets
    case trace (show mResp) mResp of
         Nothing -> writeBS $ BS.pack "Failure"
         Just response -> writeJSON response

voicingInRangeHandler :: Snap ()
voicingInRangeHandler = do
    noteS <- (liftM . liftM) BS.unpack $ getParam "note"
    chordTypeS <- (liftM . liftM) BS.unpack $ getParam "chordType"
    tuningS <- (liftM . liftM) BS.unpack $ getParam "tuning"
    lowRangeS <- (liftM . liftM) BS.unpack $ getParam "lowRange"
    highRangeS <- (liftM . liftM) BS.unpack $ getParam "highRange"
    let mFrets = do
            tuning <- tuningS >>= tuningFromString
            note <- noteS >>= readMaybe
            lowRange <- lowRangeS >>= readMaybe
            highRange <- highRangeS >>= readMaybe
            chordType <- chordTypeS >>= chordFromString
            (return . head) $ voicingsInRange tuning chordType note (FretRange lowRange highRange)
        mResp = liftM Frets mFrets
    case trace (show mResp) mResp of
         Nothing -> writeBS $ BS.pack "Failure"
         Just response -> writeJSON response
                                
parseHandler :: Snap ()
parseHandler = do
    chordsS <- (liftM . liftM) BS.unpack $ getParam "queryString"
    tuningS <- (liftM . liftM) BS.unpack $ getParam "tuning"
    lowRangeS <- (liftM . liftM) BS.unpack $ getParam "lowRange"
    highRangeS <- (liftM . liftM) BS.unpack $ getParam "highRange"
    let mFrets = do
            tuning <- tuningS >>= tuningFromString
            parseResults <- chordsS >>= stringToChords
            lowRange <- lowRangeS >>= readMaybe
            highRange <- highRangeS >>= readMaybe
            let mapf (note, chordType) = head $ voicingsInRange tuning chordType note (FretRange lowRange highRange)
            return $ map mapf parseResults
        mResp = liftM (map Frets) mFrets
    case trace (show mResp) mResp of
         Nothing -> writeBS $ BS.pack "Failure"
         Just response -> writeJSON response
                                

