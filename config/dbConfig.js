/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon dbConfig.js              
 * @descrition      : exporting mongodb database url
 * @file            : dbConfig.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
//getting dot env configs
require('dotenv').config();
//exporting mongodb database url
module.exports = {
    url: process.env.mongourl
}