import mysql from "mysql";
import { logger } from "../utils/logger.js";
import { DB_HOST, DB_USER, DB_PASS } from "../utils/secrets.js";

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
});

connection.connect((err) => {
  if (err) logger.error(err.message);
});

module.exports = connection;
