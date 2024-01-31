// utils/sendOtpEmail.js
import nodemailer  from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,//true for 465
  auth: {      
    user:process.env.SMTP_MAIL, // email
    pass:process.env.SMTP_PASSWORD, // email password
  },
});
    
const sendOtpEmail = (name,email, otp) => {
    console.log("pass",process.env.SMTP_PASSWORD);

    console.log(email,otp)
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'OTP Verification',
    text:`${name} welcome to RuNwAy Cabs. Your OTP is: ${otp}. `,};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

 export default sendOtpEmail;