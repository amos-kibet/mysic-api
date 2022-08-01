const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");
require("dotenv").config();

/*
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to the Database!');
    })
    .catch((error) => {
        console.log('Unable to connect to the Database!');
        console.error(error);
    });
*/
const app = express();
app.use(cors());
app.use(bodyParser.json());

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
app.use("/api", userRouter);

// base route, for test purposes
app.get("/", (req, res, next) => {
  res.send("Welcome to the backend!");
  next();
});

// creates an express server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
