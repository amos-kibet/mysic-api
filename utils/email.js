// @ts-nocheck
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
export const sendConfirmationEmail = (email) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  transport
    .sendMail({
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello </h2>
        <p>Thank you for registering with <b>mysic</b>.</p>
        <p>Please <a href=http://localhost:5000/confirm/>Click here</a> to confirm your account</p>
        </div>`,
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
