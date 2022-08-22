const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { logger, httpLogStream } = require("./utils/logger");
const authRouter = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));

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
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`API running on http://localhost:${port}`);
});

module.exports = app;
