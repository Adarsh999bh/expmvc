/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon dbConnection.js              
 * @descrition      : function that connects the server to database
 * @file            : dbConnection.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//importing required modules
const mongoose=require('mongoose');
const dbconfig=require('./dbConfig');
const logger=require('./logger');

/**
 * @description functon that makes connection to the database server
 */
exports.dbConnection=()=>{
    mongoose.connect(dbconfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database")
        //logg success connection here    
    }).catch(err => {
        //logg error here
        logger.error(err)
        process.exit();
    });
}