const express = require("express");
const noteRoute = express.Router();
const noteMiddleware = require('../middleware/noteMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const noteController = require("../controller/noteController");
const cors=require("cors");

noteRoute.post(
    "/create",
    cors(),
    noteMiddleware.validate,
    userMiddleware.verifyJwt,
    noteController.createNote
);
noteRoute.get(
    "/getnote",
    cors(),
    userMiddleware.verifyJwt,
    noteController.getNote
);
noteRoute.put(
    "/update",
    cors(),
    userMiddleware.verifyJwt,
    noteController.updateNote
);

noteRoute.delete(
    "/delete",
    cors(),
    userMiddleware.verifyJwt,
    noteController.deleteNote
);

module.exports=noteRoute