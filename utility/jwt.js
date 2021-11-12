require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.generateToken = (tokenGenCreds) => {
  
  return jwt.sign(
    {
      email: tokenGenCreds.email,
      _id: tokenGenCreds._id
    },
    process.env.jwtSecret,
    { expiresIn: tokenGenCreds.expiresIn }
  );
};

exports.verifyToken = (token,callback) => {
   return jwt.verify(token, process.env.mySecretKey,(err,data)=>{
    return err ? callback(err, null) : callback(null, data);
   });
};

