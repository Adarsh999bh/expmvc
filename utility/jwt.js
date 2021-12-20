/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : jwt.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//getting dot env configs
require('dotenv').config();

//importing jason web token module
const jwt = require("jsonwebtoken");

/**
 * @description generates jwt token based on params
 * @param {Object} tokenGenCreds 
 * @returns token
 */
exports.generateToken = (tokenGenCreds) => {
  
  return jwt.sign(
    {
      email: tokenGenCreds.email,
      _id: tokenGenCreds._id
    },
    process.env.mySecretKey,
    { expiresIn: tokenGenCreds.expiresIn }
  );
};

/**
 * @description verifies the incoming jwt token
 * @param {Object} token 
 * @param {callback} callback 
 * @returns callback
 */
exports.verifyToken = (token,callback) => {
   return jwt.verify(token, process.env.mySecretKey,(err,data)=>{
    return err ? callback(err, null) : callback(null, data);
   });
};

