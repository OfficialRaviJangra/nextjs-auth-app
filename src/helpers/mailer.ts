
import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { connect } from "@/lib/db";

export const sendEmail = async (email: string) => { 
    await connect();
    console.log("Connected to MongoDB");
    
    const user = await User.findOne({ email });

    const hashedToken = await bcrypt.hash(user._id.toString(), 10);

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();


let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8d9b5245eb4626",
      pass: "e07aa492e2f8b6"
    }
  });

  const mailOptions = {
    from: "noreply@gmail.com",
    to: email,
    subject: "Reset Password",
    text: "Reset Password",
    html: `<h1>Hello</h1> <p>Click <a href="${`${process.env.DOMAIN}/reset-password?token=${hashedToken}`}">here</a> to reset your password</p>`
    
}

const info = await transporter.sendMail(mailOptions);
console.log(info);
}