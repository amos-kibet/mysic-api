// @ts-nocheck
import dotenv from "dotenv";
import axios from "axios";
import { Song } from "../models/Songs.js";
import { getAllDocuments } from "../services/crud.js";

import { logger } from "../utils/log.js";
dotenv.config();

const api = process.env.MUSIC_API;

export const songsController = async (req, res) => {
  try {
    const songsData = await axios.get(api);
    const songs = songsData.data;

    let songsArray = [];
    for (const i of songs) {
      const response = i.trackMetadata;
      songsArray.push(response);
    }
    for (const songs1 of songsArray) {
      const songsDataSaved = await Song.insertMany({
        trackName: songs1.trackName,
        trackUri: songs1.trackUri,
        displayImage: songs1.displayImageUri,
        artistName: songs1.artists[0].name,
        releaseDate: songs1.releaseDate,
      });
      if (!songsDataSaved) {
        logger.error("Song list not created");
        res.status(400).json({
          message: "songs list not created!",
        });
      }
      // console.log(songsDataSaved);
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllSongs = getAllDocuments(Song);
