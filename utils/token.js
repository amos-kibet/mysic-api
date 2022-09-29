import jwt from "jsonwebtoken";
// import { JWT_SECRET_KEY } from "../utils/secrets.js";
import { logger } from "./logger.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env;
export const generate = (id) =>
  jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: "1d" });

export const decode = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    logger.error(error);
  }
};

// export default {
//   generate,
//   decode,
// };
