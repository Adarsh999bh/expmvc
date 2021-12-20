/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const jwt=require('../../utility/jwt');

class Middleware{
    /**
     * @description verifies jwt token
     * @param {Object} req 
     * @param {Object} res 
     * @param {function} next 
     */
    verifyJwt=(req,res,next)=>{
        let bearerToken = req.headers.authorization || req.params.token;
        if(!bearerToken){
            res.status(401).send("Unauthorized request");
        }
        else{
            jwt.verifyToken(bearerToken.split(" ")[1],(err,data)=>{
                if(err){
                    res.status(401).send(err);
                }
                else{
                    req.body._id=data._id;
                    next();
                }
            });
        }
    };
}

module.exports=new Middleware();