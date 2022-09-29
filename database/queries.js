import dotenv from "dotenv";
dotenv.config();

const { DB_NAME } = process.env;

export const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

export const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

export const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

export const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, NOW())
`;

export const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

// module.exports = {
//   createDB,
//   dropDB,
//   createTableUsers,
//   createNewUser,
//   findUserByEmail,
// };
