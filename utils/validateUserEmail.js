import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', // email id
        pass: '' // email password
    }
  });
  let mailOptions = {
    from: "",// your email
    to: email,
    subject: "Email Verification",
    body: `Click this link <a href=http://localhost:5000/api/auth/verify/${token}> here </a> to verify your email.`,
  };

  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Email Sent");
    }
  });
};