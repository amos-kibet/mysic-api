// @ts-nocheck
const connection = require("../config/db.config");
// @ts-ignore
const { findUserByEmail } = require("../database/queries");
// @ts-ignore
const { findByEmail } = require("../models/userModel");
const User = require("../models/userModel");
const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../utils/password");
const { generate: generateToken } = require("../utils/token");
const sendVerificationEmail = require("../utils/validateUserEmail");

exports.signup = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = hashPassword(password.trim());

  const user = new User(username.trim(), email.trim(), hashedPassword);

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      const token = generateToken(user);
      res.status(201).send({
        status: "success",
        data: {
          token,
          data,
        },
      });
    }
    // @ts-ignore
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      email,
      (err, result) => {
        if (err) {
          // @ts-ignoreS
          throw Error(err);
        }

        const id = result[0].id;
        sendVerificationEmail(email, id);
      }
    );

    // @ts-ignore
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        res.status(200).send({
          status: "success",
          data: {
            token,
            username: data.username,
            email: data.email,
          },
        });
        return;
      }
      res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
};
// exports const verifyEmail = async (req, res) => {};
// @ts-ignore
exports.verifyEmail = async (req, res) => {
  const { id } = req.query;
  try {
    connection.query("SELECT * FROM users WHERE id=?", id, (err, result) => {
      if (err) {
        // @ts-ignore
        throw Error(err);
      }
      result[0].isActive = true;
    });
  } catch (err) {
    return err.message;
  }
};
function err(err) {
  throw new Error("Function not implemented.");
}
