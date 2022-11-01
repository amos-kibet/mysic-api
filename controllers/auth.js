import { User } from "../models/User.js";
import { hash, compare } from "../utils/password.js";
import { sendConfirmationEmail } from "../utils/email.js";
import Jwt from "jsonwebtoken";
import cookie from "cookie";

import { config } from "dotenv";
import { logger } from "../utils/log.js";
config();

const signUpController = async (req, res) => {
  const { username, email, password } = req.body;
  const checkUser = await User.findOne({ email: email });
  if (checkUser) {
    return res
      .status(400)
      .json({ message: "user already exists. Login", checkUser });
  }
  const hashPassword = hash(password);
  const newUser = new User({
    username: username,
    email: email,
    password: hashPassword,
  });
  let user;
  try {
    user = await newUser.save();
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
  const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  if (!token) {
    return res.status({ message: "error while generating token" });
  }
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("mysic_acces_token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
  );
  sendConfirmationEmail(email, user._id);
  return res.json(user);
};

const signInController = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
  if (!user) {
    return res.status(400).json({ message: "Account not found. Register" });
  }
  const savedPassword = user.password;
  const isPasswordCorrect = compare(password, savedPassword);
  if (isPasswordCorrect === false) {
    return res.status(400).json({ message: "Wrong Pin!" });
  }
  const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("mysic_acces_token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
  );
  return res.status(200).json({ message: "Welcome to mysic api" });
};
export default { signInController, signUpController };
