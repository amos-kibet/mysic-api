// @ts-nocheck
// import bcrypt from "bcrypt";

import { User } from "../models/User.js";

import { hash, compare } from "../utils/password.js";

export const signUpController = async (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email }, (err, data) => {
    console.log(data);
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    if (data) {
      return res.status(401).json({
        error: "Email already in use",
      });
    }

    const user = new User({
      username: username,
      email: email,
      password: hash(password),
    });

    user
      .save()
      .then(() => {
        return res.status(201).json({
          success: "User created successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  });

  // const user = await User.findOne({ email }).exec();
  // console.log(user);
  // console.log(email);

  // if (user.email) {
  //   return res.status(401).json({
  //     error: "Email already in use",
  //   });
  // }

  // let user_ = new User({
  //   username: username,
  //   email: email,
  //   // password: bcrypt.hash(password, 10),
  //   password: hash(password),
  // });
  // user_
  //   .save()
  //   .then(() => {
  //     //console.log(user_);
  //     res.status(201).json({
  //       message: "User created successfully",
  //     });
  //   })
  //   .catch(() => {
  //     return res.status(500).json({
  //       error: error.message,
  //     });
  //   });
};

export const signInController = (req, res) => {
  const { email, password } = req.body;
  const user = User();

  User.find({ email }, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        return res.status(404).json({
          error: "There is no user with the provided email!",
        });
      }
      return res.status(500).json({
        error: err.message,
      });
    }
    if (data) {
      if (compare(password, data.password)) {
        user
          .save()
          .then(() => {
            console.log("User logged in successfully");
            res.status(200).json({
              success: "User logged in successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              error: err.message,
            });
          });
      }
      return res.status(401).json({
        error: "Incorrect password",
      });
    }
  });
};
