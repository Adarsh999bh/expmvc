/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon mailer.js              
 * @descrition      : set up the mailer object and sends emails
 * @file            : mailer.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//importing node mailer module
var nodemailer = require("nodemailer");
//importing logger object
const logger = require('../config/logger');
//getting dot env configs
require('dotenv').config();

/**
 * @description function that sends email to the client by creating body and using
 * necessary info from dot env
 * @param {Object} body 
 */
const createEmail = (body) => {

  console.log(process.env.email);

  //creating mailer object to send email
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:  process.env.email,
      pass:  process.env.password,
    },
  });

  //setting mail options
  var mailOptions = {
    from: process.env.email,
    to: body.email,
    subject: body.subject,
    text: body.text,
    html:body.html
  };

  //sending email
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

//exporting createEmail
module.exports = {
    createEmail
}