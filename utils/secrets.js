// import dotenv from "dotenv";
// import { logger } from "./logger.js";
// dotenv.config();

// const { DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET_KEY } = process.env;

// const requiredCredentials = [
//   "DB_HOST",
//   "DB_USER",
//   "DB_PASS",
//   "DB_NAME",
//   "JWT_SECRET_KEY",
// ];

// for (const credential of requiredCredentials) {
//   if (process.env[credential] === undefined) {
//     logger.error(`Missing required credentials: ${credential}`);
//     process.exit(1);
//   }
// }

// module.exports = {
//   DB_HOST,
//   DB_USER,
//   DB_PASS,
//   DB_NAME,
//   JWT_SECRET_KEY,
// };
