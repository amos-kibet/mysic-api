import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;
export const dbConnect = () => {
  mongoose
    .connect(uri)
    .then(console.log("connected to db! ✅"))
    .catch((err) => console.log(err, "failed to connect to db ❌"));
};
