const express=require('express');
const userRoute=express.Router();
const { body } = require('express-validator');
const cors=require('cors');
const userController = require('../controller/userController');
const Middleware = require('../middleware/userMiddleware');


userRoute.post(
    "/login",
    cors(),
    userController.loginUser
)

userRoute.post(
    "/create",
    cors(),
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
  cors(),
  userController.getUser
);

userRoute.put(
    "/update/:userID",
    cors(),
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
  cors(),
  userController.deleteUser
);

userRoute.post(
  "/forgotpass",
  cors(),
  userController.forgotpass
)

userRoute.post(
  "/reset/:token",
  cors(),
  Middleware.verifyJwt,
  userController.reset,
)

module.exports=userRoute

