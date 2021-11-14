const express = require("express");
const noteRoute = express.Router();
const noteMiddleware = require('../middleware/noteMiddleware');
const userMiddleware = require('../middleware/userMiddleware');

noteRoute.post(
    "/create",
    noteMiddleware.validate,
    userMiddleware.verifyJwt,
    (ewq,res)=>{

    }
);
noteRoute.get(
    "/getnote",
    userMiddleware.verifyJwt,
    (req,res)=>{

    }
);
noteRoute.put(
    "/update",
    userMiddleware.verifyJwt,
    (req,res)=>{

    }
);

noteRoute.delete(
    "/delete",
    userMiddleware.verifyJwt,
    (req,res)=>{

    }
);

module.exports=noteRoute