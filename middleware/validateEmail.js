const User = require("../models/userModel");

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  User.findByEmail(email, (_, data) => {
    if (data) {
      res.status(400).send({
        status: "error",
        message: `A user with email address '${email}' already exits`,
      });
      return;
    }
    next();
  });
};

module.exports = validateEmail;
