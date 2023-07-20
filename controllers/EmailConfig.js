
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const MAIL_SETTINGS = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:465,
    secure:true,
    auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASS,
    },
}

const transporter = nodemailer.createTransport(MAIL_SETTINGS);
const sendMail = async (params) => {
    try {
        let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: params.to,
            subject: 'Hello ✔',
            html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the stack-overflow.</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
          <h2>Otp is valid for only 10 minutes</h2>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
        });
        return info;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = sendMail;