import cors from "cors";
import morgan from "morgan";
import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.config.js";
import { authRouter } from "./routes/user.js";
import { songsRouter } from "./routes/songs.js";
import { adminUserManagement } from "./routes/admin/usersManagement.js";
import { logger, httpLogStream } from "./utils/log.js";
// import { redisConnection } from "./config/redis.conect.js";

dotenv.config();

dbConnect();
// redisConnection()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined", { stream: httpLogStream }));

// TODO: Refactor this block of code
app.use("/api", authRouter);
app.use("/api", songsRouter);
app.use("/api", adminUserManagement);

// base route, for test purposes
app.get("/", (req, res) => {
  res.status(200).send({
    msg: "API working fine!",
  });
  logger.log("info", "API working fine!");
  console.log("API working fine!");
});

// FIXME: Refactor this, not sure of it's use
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

export default app;
