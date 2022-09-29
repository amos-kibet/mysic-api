import mysql from "mysql2.js";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

conn.connect((error) => {
  if (error) throw error;
  console.log("Database connected successfully! ✅");
});

module.exports = conn;
