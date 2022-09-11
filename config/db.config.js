// @ts-nocheck
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;
const options = {
  dbName: "data",
};
export const dbConnect = () => {
  mongoose
    .connect(uri, options)
    .then(console.log("connected to db! ✅"))
    .catch((err) => console.log(err, "failed to connect to db ❌"));
};
