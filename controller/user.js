const User = require("../models/userModel");
const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../utils/password");
const { generate: generateToken } = require("../utils/token");

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
      const token = generateToken(data.id);
      res.status(201).send({
        status: "success",
        data: {
          token,
          data,
        },
      });
    }
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
