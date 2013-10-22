{-# LANGUAGE OverloadedStrings #-}
module Interface where

import Snap.Extras.JSON
import Hasmt.Fretboard
import Hasmt.Chord
import Hasmt.Note
import Data.Aeson.Types
import Hasmt.Interval
import qualified Data.Text as T

data ApiResponse = Frets { getFrets :: [(Interval, Fret)] } deriving (Show)

instance ToJSON ApiResponse where
    toJSON (Frets xs) = object $ map f xs
        where f (interval, (Fret sn fn)) = 
                let fretstr = T.pack $ "fret_" ++ show sn ++ "_" ++ show fn in
                    fretstr .= (object ["active" .= True, "interval" .= show interval])

-- TODO: Write this better.. sometime all this unsafe crap will bite you in the ass..
voiceLeadRootedChords :: Tuning -> [(Note, Chord)] -> FretRange -> [Voicing]
voiceLeadRootedChords _ [] _ = []
voiceLeadRootedChords t [(n,c)] fr = [head $ voicingsInRange t c n fr]
voiceLeadRootedChords t ((n,c):cs) fr = scanl foldf seed cs
    where seed = head $ voiceLeadRootedChords t [(n,c)] fr
          foldf v (n',c') = closestChordToVoicing t v n' c'

chordFromString :: String -> Maybe Chord
chordFromString s 
    | s == "majorTriad" = Just majorTriad
    | s == "minorTriad" = Just minorTriad
    | s == "augTriad" = Just augTriad
    | s == "dimTriad" = Just dimTriad
    | s == "maj7chord" = Just maj7chord
    | s == "dom7chord" = Just dom7chord
    | s == "min7chord" = Just min7chord
    | s == "halfdim7chord" = Just halfdim7chord
    | s == "fulldim7chord" = Just fulldim7chord
    | otherwise = Nothing

tuningFromString :: String -> Maybe Tuning
tuningFromString s 
    | s == "standardTuning" = Just standardTuning
    | otherwise = Nothing
