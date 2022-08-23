// import * as nodemailer from "nodemailer";
// import * as dotenv from "dotenv";
const nodemailer = require("nodemailer");
// const token = require("../controller/user");
require("dotenv").config();

// exports.sendVerificationEmail = async (email, token) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.USER_EMAIL, // email id
//       pass: process.env.PASS, // email password
//     },
//   });
//   let mailOptions = {
//     //from: "",
//     to: email,
//     subject: "Email Verification",
//     body: `Click this link <a href=http://localhost:5000/api/auth/verify/${token}> here </a> to verify your email.`,
//   };

//   transporter.sendMail(mailOptions, (err, success) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log("Email Sent");
//     }
//   });
// };

const sendVerificationEmail = (email, token) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS,
    },
  });

  transport
    .sendMail({
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello </h2>
        <p>Thank you for registering with <b>mysic</b>.</p>
        <p>Please <a href=http://localhost:5000/confirm/${token}> Click here</a> to confirm your account</p>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports = sendVerificationEmail;
