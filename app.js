import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.config.js";
import { authRouter } from "./routes/user.js";
import { songsRouter } from "./routes/songs.js";

dotenv.config();

dbConnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", authRouter);
app.use("/api/", songsRouter);

// base route, for test purposes
app.get("/", (req, res) => {
  res.status(200).send({
    msg: "API working fine!",
  });
  console.log("API working fine!");
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
