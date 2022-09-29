import mysql from "mysql";
import { logger } from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET_KEY } = process.env;
const dbConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

dbConnection.connect((err) => {
  if (err) logger.error(err.message);
  else logger.info("Database connected");
});

export default dbConnection;
