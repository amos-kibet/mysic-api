import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const songsSchema = new mongoose.Schema({
  trackName: {
    type: String,
    required: true,
  },
  trackUri: {
    type: String,
    required: true,
  },
  displayImage: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    // required: true,
  },
  releaseDate: {
    type: String,
    // required: true,
  },
});

export const Songs = mongoose.model("Songs", songsSchema);
