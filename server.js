/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//import express
const express=require('express');

//import cors
const cors=require('cors');

//import db connection function
const dbconn=require('./config/dbConnection');

//importing custom logger
const logger=require('./config/logger');

//importing user routes
const userRouter=require('./app/routes/userRoutes');

//importing note routes
const noteRouter=require('./app/routes/noteRoutes');

//importing label routes
const labelRouter=require('./app/routes/labelRoutes');

//importing swaggerui
const swaggerUi = require("swagger-ui-express");

//importing swagger json
const swaggerDocument = require("./swagger.json");

//creating an express app
const app=express();

//adding urlencoded middleware to app
app
.use(express.
    urlencoded({
        extended:false
}));

//adding json middleware to accept and send json objects as req and res
app
.use(express.json());

//adding cors to accept requests from different sources
app.use(cors())

//adding user router to app
app.use('/user',userRouter);

//adding note router to app
app.use('/notes',noteRouter);

//adding label router to app
app.use('/label',labelRouter);

//adding static route to access image files in frontend
app.use(express.static('uploads'))

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @description creates server and listens at specified port also connects the
 *  server to the db
 * db server
 * @param PORT server listens for requests at this port
 * @param callback function that will called to connect to database on successful
 *  creation of server
 */
const server=app.listen(4000,()=>{

    dbconn.dbConnection();

    logger.info("server created")
    console.log("server created");

});


module.exports=app;


