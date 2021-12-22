/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const express=require('express');
const userRoute=express.Router();
const { body } = require('express-validator');
const userController = require('../controller/userController');
const Middleware = require('../middleware/userMiddleware');


userRoute.post(
    "/login",
    userController.loginUser
)

userRoute.post(
    "/create",
    body("firstName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "First Name should begin with caps and should be minimum of length 3"
    ),
    body("lastName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "Last Name should begin with caps and should be minimum of length 3"
    ),
    body("age")
    .isNumeric()
    .withMessage("Enter a valid age between (1-100)"
    ),
    body("email")
    .isEmail()
    .withMessage("Enter a valid Email"
    ),
    userController.createUser
);

userRoute.get(
  "/getuser",
  userController.getUser
);

userRoute.get(
  "/findall",
  userController.findAllUser
);

userRoute.put(
    "/update/:userID",
    body("firstName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "First Name should begin with caps and should be minimum of length 3"
    ),
    body("lastName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "Last Name should begin with caps and should be minimum of length 3"
    ),
    body("age")
    .isNumeric()
    .withMessage("Enter a valid age between (1-100)"
    ),
    body("email")
    .isEmail()
    .withMessage("Enter a valid Email"
    ),
    userController.updateUser
);

userRoute.delete(
  "/deleteuser/:userID",
  userController.deleteUser
);

userRoute.post(
  "/forgotpass",
  userController.forgotpass
)

userRoute.post(
  "/reset/:token",
  Middleware.verifyJwt,
  userController.reset,
)

module.exports=userRoute

