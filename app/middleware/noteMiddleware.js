/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
class noteMiddleware {
  /**
   * @description validates req body
   * @param {Object} req 
   * @param {Object} res 
   * @param {function} next 
   * @returns 
   */
    validate = (req, res, next) => {
      //check if content is present
      if (!req.body.content) {
        return res.status(400).send(
        "Note content can not be empty"
        );
      }
       else {
        next();
      }
    };
}

module.exports=new noteMiddleware();