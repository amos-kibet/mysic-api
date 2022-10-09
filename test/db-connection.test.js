import * as dotenv from "dotenv";
import mongoose from "mongoose";
import mongooose from "mongoose";
import { signup, signin } from "../controllers/auth.js";
import getAllDocuments from "../utils/crud.js";
dotenv.config();

describe("Connection", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    mongoose.disconnect();
    dotenv();
  });
});
