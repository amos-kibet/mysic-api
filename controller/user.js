const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/user");

/**
 * const bcrypt = require('bcryptjs');
 * const jwt = require('jsonwebtoken');
 * const User = require('../models/user');
 *
 * exports.signup = (req, res, next) => {
 *     User.findOne({email: req.body.email}).then((user) => {
 *         if (user) {
 *             return res.status(409).json({
 *                 message: "Email is already registered!"
 *             })
 *         } else {
 *
 *             bcrypt.hash(req.body.password, 10)
 *                 .then(
 *                     (hash) => {
 *                         const user = new User({
 *                             username: req.body.username,
 *                             email: req.body.email,
 *                             password: hash
 *                         });
 *                         user.save()
 *                             .then(
 *                                 (response) => {
 *                                     res.status(201).json({
 *                                         message: 'Your account has been created successfully!',
 *                                         result: response
 *                                     });
 *                                     // ToDo: implement res.redirect()
 *                                 }
 *                             ).catch(
 *                             (error) => {
 *                                 res.status(500).json({
 *                                     error: error
 *                                 });
 *                             }
 *                         );
 *                     }
 *                 );
 *         }
 *     })
 *
 * };
 *
 * exports.login = (req, res, next) => {
 *     User.findOne({email: req.body.email}).then(
 *         (user) => {
 *             if (!user) {
 *                 return res.status(401).json({
 *                     error: new Error('Account not found!')
 *                 });
 *             }
 *             bcrypt.compare(req.body.password, user.password).then(
 *                 (valid) => {
 *                     if (!valid) {
 *                         return res.status(401).json({
 *                             error: new Error('Incorrect password!')
 *                         });
 *                     }
 *                     const token = jwt.sign({userId: user._id},
 *                         process.env.SECRET,
 *                         {expiresIn: '24h'});
 *                     res.status(200).json({
 *                         userId: user._id,
 *                         token: token
 *                     });
 *                     // ToDo: implement res.redirect()
 *                 }
 *             ).catch(
 *                 (error) => {
 *                     res.status(500).json({
 *                         error: error
 *                     });
 *                 }
 *             );
 *         }
 *     ).catch(
 *         (error) => {
 *             res.status(500).json({
 *                 error: error
 *             });
 *         }
 *     );
 * };
 */

// @ts-ignore
exports.signup = (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;
  console.log(password);

  if (password === cpassword) {
    let sql = "select * from users where email = ?;";

    // @ts-ignore
    db.query(sql, [email], (err, result, fields) => {
      if (err) throw err;

      // @ts-ignore
      if (result.length > 0) {
        //req.session.flag = 1;
        // return res.redirect('/');
        return res.status(409).json({
          error: "Email exists in DB!",
          // redirect: res.redirect("/api/register")
        });
      } else {
        // let sql = 'insert into users(username, email, password) values (?,?,?);';
        hash(password);
        db.query(
          "insert into users(username, email, password) values (?,?,?);",
          [username, email, password],
          // @ts-ignore
          (err, result, fields) => {
            if (err) throw err;
            // req.session.flag = 2;
            return res.status(200).json({
              msg: "You are signed up!",
              //redirect: res.redirect("/")
            });
          }
        );
      }
    });
  } else {
    // req.session.flag = 3;
    return res.status(409).json({
      error: "Passwords do not match!",
      //redirect: res.redirect("/api/register")
    });
  }

  /*
    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
        // @ts-ignore
        (err, result) => {
            // @ts-ignore
            if (result.length > 0) {
                return res.status(409).send({
                    msg: "This email is already taken!",
                });
            } else {
                // username is available
            }
            return hash(res.body.password)
                .then((hash) => {
                    return db.query(
                        `INSERT INTO users (name, email, password) VALUES ('${
              req.body.name
            }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
                        // @ts-ignore
                        (err, result) => {
                            if (err) {
                                throw err;
                            }
                            return resolve({
                                msg: "The user has been registered with us!",
                            });
                        }
                    );
                })
                .catch((error) =>
                    res.send(401, {
                        error: error,
                    })
                );
        }
    );
    */
};

/*
let hash = (key) => {
  bcrypt.hash(key, 10, (err, hash) => {
    if (err) throw err;
    return hash;
  });
};
*/

let hash = (key) => {
  new Promise((resolve, reject) => {
    bcrypt.hash(key, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
};

let compareHash = (key1, key2) => {
  new Promise((resolve, reject) => {
    bcrypt.compare(key1, key2, (error, result) =>
      error ? reject(error) : resolve(result)
    );
  });
};
// @ts-ignore
exports.login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var sql = "select * from users where email = ?;";

  // @ts-ignore
  db.query(sql, [email], (err, result, fields) => {
    if (err) throw err;

    // @ts-ignore
    if (result.length && compareHash(password, result[0].password)) {
      // @ts-ignore
      const token = jwt.sign({ id: result[0].id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      db.query(
        `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
      );
      return res.status(200).send({
        msg: "Logged in!",
        token: token,
        user: result[0],
      });
    } else {
      return res.status(500).send({
        msg: "Error!",
      });
    }
  });
  /*
    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                throw new Error(err);
            }
            // @ts-ignore
            if (!result.length) {
                return res.status(401).send({
                    msg: "Email or password is incorrect!",
                });
            }

            compareHash(req.body.password,
                result[0]["password"])
                .then((data) => {
                        if (data) {
                            // @ts-ignore
                            const token = jwt.sign({id: result[0].id}, process.env.SECRET, {
                                expiresIn: "1h",
                            });
                            db.query(
                                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                            );
                            return res.status(200).send({
                                msg: "Logged in!",
                                token: token,
                                user: result[0],
                            });
                        }
                    }
                )
                .catch((error) => res.status(401).send({
                    msg: "Username or password is incorrect!",
                }))
            // check password
            // bcrypt.compare(
            //   req.body.password,
            //   result[0]["password"],
            //   (bErr, bResult) => {
            //     // wrong password
            //     if (bErr) {
            //       throw bErr;
            //     }

            //     return res.status(401).send({
            //       msg: "Username or password is incorrect!",
            //     });
            //   }
            // );
            // log incoming payload & result
            console.log(req.body.email);
            console.log(result);
        }
    );

     */
};
