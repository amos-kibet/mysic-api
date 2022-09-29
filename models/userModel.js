import dbConnection from "../config/db.config.js";
import { createNewUser, findUserByEmail } from "../database/queries.js";
import { logger } from "../utils/logger.js";

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static create(newUser, callback) {
    dbConnection.query(
      createNewUser,
      [newUser.username, newUser.email, newUser.password],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          callback(err, null);
          return;
        }
        callback(null, {
          id: res.insertId,
          username: newUser.username,
          email: newUser.email,
        });
      }
    );
  }

  static findByEmail(email, callback) {
    dbConnection.query(findUserByEmail, email, (err, res) => {
      if (err) {
        logger.error(err.message);
        callback(err, null);
        return;
      }
      if (res.length) {
        callback(null, res[0]);
        return;
      }
      callback({ kind: "not_found" }, null);
    });
  }
}

export default User;
