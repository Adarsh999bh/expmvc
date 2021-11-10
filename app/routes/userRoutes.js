const express=require('express');
const userRoute=express.Router();
const { body } = require('express-validator');
const cors=require('cors');


userRoute.post(
    "/login",
    cors(),
    (req,res)=>{

    }
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
    (req,res)=>{

    }
);

userRoute.get(
  "/getuser",
  (req,res) => {

  }
);

userRoute.put(
    "/update",
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
    (req,res)=>{

    }
);

userRoute.delete(
  "/deleteuser",
  (req,res) => {

  }
);

