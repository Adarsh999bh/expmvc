/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon logger.js              
 * @descrition      : set up logger object
 * @file            : logger.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//importing required modules from winston
const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, prettyPrint, json } = format;

//creating a transport object
var transport = new transports.DailyRotateFile({
  filename: "./logs/Log-%DATE%.log",
  datePattern: "DD-MM-YYYY",
});

/**
 * @description creates logger object
 */
const logger = createLogger({
  level: "info",
  format: combine(
    json(),
    timestamp({ format: "DD-MM-YYYY, HH:mm:ss" }),
    prettyPrint()
  ),
  transports: [transport],
});

module.exports = logger
