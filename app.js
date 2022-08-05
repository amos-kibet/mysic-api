const express = require("express");
const cors = require("cors");
// const path = require("path");
const authRouter = require("./routes/user");
// const { loggers } = require("winston");
const morgan = require("morgan");
const { logger, httpLogStream } = require("./utils/logger");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
*/

//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api", authRouter);

// base route, for test purposes
app.get("/", (req, res, next) => {
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
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

// creates an express server
const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

module.exports = app;
