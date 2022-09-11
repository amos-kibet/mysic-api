// @ts-nocheck
import dotenv from "dotenv";
import axios from "axios";
import { Song } from "../models/Songs.js";
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
    songsArray.forEach(async (songs) => {
      const songsDataSaved = await Song.insertMany({
        trackName: songs.trackName,
        trackUri: songs.trackUri,
        displayImage: songs.displayImageUri,
        artistName: songs.artists[0].name,
        releaseDate: songs.releaseDate,
      });
      if (!songsDataSaved) {
        res.status(400).json({
          message: "songs list not created!",
        });
      }
      // console.log(songsDataSaved);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({}).exec();
    if (!songs) {
      res.status(500).json({ message: "no songs found" });
    }
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
