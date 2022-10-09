import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { hasUncaughtExceptionCaptureCallback } from "process";
import { signUpController, signInController } from "../controllers/auth.js";
import sum from "../controllers/sum.js";

dotenv.config();

describe("POST /api/signup", () => {
  //   beforeAll(async () => {
  //     await mongoose.connect(process.env.MONGO_URI, {
  //       useNewUrlParser: true,
  //       useCreateIndex: true,
  //       useUnifiedTopology: true,
  //     });
  //   });

  //   test("Signs up a new user", () => {
  //     expect(signUpController(req, res).toBe());
  //   });
  test("Sample test", () => {
    expect(sum(2, 3)).toBe(5);
  });

  //   afterAll(async () => {
  //     mongoose.disconnect();
  //     dotenv();
  //   });
});
