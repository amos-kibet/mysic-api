import { logger } from "../utils/logger.js";
import User from "../models/userModel.js";
import { hash, compare } from "../utils/password.js";
import { generate } from "../utils/token.js";

export const signup = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = hash(password.trim());

  const user = new User(username.trim(), email.trim(), hashedPassword);

  User.create(user, (err, data) => {
    if (err) {
      logger.log({ level: "error", message: err.message });
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      logger.log({ level: "success", message: data });
      const token = generate(data.id);
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

export const signin = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        logger.log({
          level: "error",
          message: `User with email ${email} was not found`,
        });
        res.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      logger.log({ level: "error", message: err.message });
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (compare(password.trim(), data.password)) {
        logger.log({ level: "success", message: data });
        const token = generate(data.id);
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
      logger.log({ level: "error", message: "Incorrect password on signin" });
      res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
};
