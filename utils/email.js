// @ts-nocheck
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { User } from "../models/User.js";
import { logger } from "./log.js";

dotenv.config();
export const confirmedEmail = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: id },
    { confirmedEmail: true }
  ).exec();
  if (!user) {
    logger.error("Could not find User");
    return false;
  }
  return res.send("Email confirmed ✅");
};
export const sendConfirmationEmail = async (email, id) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  await transport
    .sendMail({
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello </h2>
        <p>Thank you for registering with <b>mysic</b>.</p>
        <p>Please <a href=https://api-ibambe.onrender.com/api/confirm/${id}>Click here</a> to confirm your account</p>
        </div>`,
    })
    .then((data) => {
      if (Error) {
        logger.error(Error);
        return `Could not send email. See error: ${Error}`;
      }
      logger.info(data);
      return res.status(200).json({
        success: "Email sent successfully",
      });
    })
    .catch((error) => {
      logger.error(error.message);
      return error;
    });
};
