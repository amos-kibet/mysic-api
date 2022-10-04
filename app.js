import express from "express";
import cors from "cors";
// const morgan = require("morgan");
// const { logger, httpLogStream } = require("./utils/logger");

import authRouter from "./routes/user.js";
import { logger } from "./utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan("dev"));
// app.use(morgan("combined", { stream: httpLogStream }));

app.use("/api", authRouter);

// base route, for test purposes
app.get("/", (req, res) => {
  // res.sendStatus(200).send({
  //   status: "success",
  //   data: {
  //     message: "API working fine!",
  //   },
  // });
  res.status(200).send({
    msg: "API working fine!",
  });
  console.log("API working fine!");
});

app.use((err, req, res, next) => {
  logger.log({ level: "error", message: err.message });
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

// creates an express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.log({
    level: "info",
    message: `API running on http://localhost:${port}`,
  });
  console.log(`API running on http://localhost:${port}`);
});

export default app;
