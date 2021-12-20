/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const express = require("express");
const noteRoute = express.Router();
const noteMiddleware = require('../middleware/noteMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const noteController = require("../controller/noteController");

noteRoute.post(
    "/create",
    noteMiddleware.validate,
    userMiddleware.verifyJwt,
    noteController.createNote
);
noteRoute.get(
    "/getnote",
    userMiddleware.verifyJwt,
    noteController.getNote
);
noteRoute.put(
    "/update",
    userMiddleware.verifyJwt,
    noteController.updateNote
);

noteRoute.delete(
    "/delete",
    userMiddleware.verifyJwt,
    noteController.deleteNote
);

noteRoute.post("/upload-image",
    userMiddleware.verifyJwt,
    noteController.uploadImage
);

module.exports=noteRoute