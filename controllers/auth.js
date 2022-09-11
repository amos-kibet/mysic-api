// @ts-nocheck
import bcrypt from "bcrypt";

import { User } from "../models/User.js";

export const signUpController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email }).exec(); // buggy code >> slow to execute
  console.log(user);
  if (user) {
    return res.status(400).json({
      error:
        "The email address you have entered is already associated with another account.",
    });
  }
  let user_ = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  user_
    .save()
    .then(() => {
      return res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch(() => {
      return res.status(500).json({
        error: "Internal server error!",
      });
    });
};

const hashedPassword = bcrypt.hash(password, { salt: 10 }, (error, hash) => {
  if (error) throw error;
  return hash;
});
