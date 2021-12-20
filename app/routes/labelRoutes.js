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
const userMiddleware = require('../middleware/userMiddleware');
const LabelController=require('../controller/labelController');

/**
 * routes for label CRUD
 */

//create
noteRoute.post("/create-label",
userMiddleware.verifyJwt,
LabelController.createLabel);

//read
noteRoute.get("/get-label",
userMiddleware.verifyJwt,
LabelController.getLabel);

//update
noteRoute.put("/update-label",
userMiddleware.verifyJwt,
LabelController.updateLabel);

//delete
noteRoute.delete("/delete-label",
userMiddleware.verifyJwt,
LabelController.deleteLabel);

module.exports=noteRoute;