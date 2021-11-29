const express = require("express");
const noteRoute = express.Router();
const noteMiddleware = require('../middleware/noteMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const noteController = require("../controller/noteController");
const cors=require("cors");

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

module.exports=noteRoute