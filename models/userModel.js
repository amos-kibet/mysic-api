const db = require("../config/db.config");
const {
  createNewUser: createNewUserQuery,
  findUserByEmail: findUserByEmailQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static create(newUser, callback) {
    db.query(
      createNewUserQuery,
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
    db.query(findUserByEmailQuery, email, (err, res) => {
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

module.exports = User;
