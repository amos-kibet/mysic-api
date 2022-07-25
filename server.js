const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/router");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api", authRouter);

// Handling Errors
// Might be optional, will check on this
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

// @ts-ignore
const port = process.env.PORT | 3000;
app.listen(3000, () => console.log(`mysic-api is running on port ${port}`));
