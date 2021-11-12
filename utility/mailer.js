var nodemailer = require("nodemailer");
const logger = require('../config/logger');
require('dotenv').config();

const createEmail = (body) => {
  console.log(process.env.email);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:  process.env.email,
      pass:  process.env.password,
    },
  });
  var mailOptions = {
    from: process.env.email,
    to: body.email,
    subject: body.subject,
    text: body.text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        logger.error(error);
        console.log(error);
    } else {
        logger.info("Email sent: " + info.response);
        console.log("Email sent: " + info.response);
    }
  });
};
module.exports = {
    createEmail
}