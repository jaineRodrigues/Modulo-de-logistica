const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  if (process.env.NODE_ENV === "production") {
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.EMAIL_NAME + "<" + process.env.EMAIL_FROM + ">", // sender address
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };
    } else {
        var testAccount = await nodemailer.createTestAccount();
        var transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        var mailOptions = {
            from: "Modulo de logistica" + "<" +testAccount.user + ">", // sender address
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };
    }

    return await transporter.sendMail(mailOptions);
};


module.exports = sendEmail;
