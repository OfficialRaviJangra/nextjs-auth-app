
import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { connect } from "@/lib/db";

export const sendEmail = async (email: string, emailType: string) => { 
    await connect();
    
    const user = await User.findOne({ email });

    const hashedToken = await bcrypt.hash(user._id.toString(), 10);

    if(emailType === "verify") {
        user.verifyToken = hashedToken;
        user.verifyTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
    }else if(emailType === "forgotPassword") {
        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    }


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_AUTH_USER, 
      pass: process.env.MAIL_AUTH_PASS 
    }
  });

  const mailOptions = {
    from: "noreply@gmail.com",
    to: email,
    subject: `${emailType ==="verify" ? "Verify your account" : "Reset your password"}`,
    text: "Reset Password",
    html: `<h1>${emailType === "verify" ? "Verify your account" : "Reset your password"}</h1> 
            <p>Click <a href="${`${process.env.DOMAIN}/${emailType === "verify" ? "verify" : "reset-password"}?token=${hashedToken}`}">here</a> to reset your password</p>`

}

const info = await transporter.sendMail(mailOptions);
console.log(info);
}