/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon userService.js              
 * @descrition      : set up the server and connects to the database
 * @file            : userService.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//importing required modules
const userModel=require('../model/userModel');
const bcrypt=require('bcrypt');
const {generateToken}=require('../../utility/jwt');
const {createEmail}=require('../../utility/mailer');
const redis=require('../../utility/redis/cache')

class UserService{

    /**
     * @description logs the user in by cmparing password enrtered
     * and hashed password from the database
     * @param {Object} body 
     * @param {Callback} callback 
     */
    loginUser=(body,callback)=>{
        userModel.loginUser(body,(err,data)=>{
            if(err){
                return callback({
                    message:err.message,
                    statusCode:err.statusCode || 500
                },null);
            }
            else{
                if(bcrypt.compareSync(body.password,data.password)){
                    //token gen
                    //return login success with token

                    return callback(null,{
                        token:generateToken({
                            email:data.email,
                            _id:data._id,
                            expiresIn:"1h"
                        })
                    });
                }
                else{
                    return callback({
                        message:"Password mismatch",
                        statusCode:401
                    },null);
                }
            }
        });
    };

    /**
     * @description create user function in service layer
     * @param {Object} body 
     * @param {callback} callback 
     */
    createUser=(body,callback)=>{

        userModel.createUser(body,(err,data)=>{
            return err ?
            callback({
                message:err.message,
                statusCode:err.statusCode || 500
            },null):
            callback(null,data);
        });
    };

    /**
     * @description service layer for updating user
     * @param {String} userID 
     * @param {Object} body 
     * @param {callback} callback 
     */
    updateUser=(userID,body,callback)=>{

        userModel.updateUser(userID,body,(err,data)=>{
            err ?
            callback({
                message:err.message,
                statusCode:err.statusCode || 500
            },null):
            callback(null,data);
        });
    };

    /**
     * @description delete user in service layer
     * @param {String} userID 
     * @param {callback} callback 
     */
    deleteUser=(userID,callback)=>{

        userModel.deleteUser(userID,(err,data)=>{
            err ?
            callback({
                message:err.message,
                statusCode:err.statusCode || 500
            },null):
            callback(null,data);
        });
    };

    /**
     * @description delete user in service layer
     * @param {String} email 
     * @param {callback} callback 
     */
    getUser=(email,callback)=>{
        userModel.getUser(email,(err,data)=>{
            err ?
            callback({
                message:err.message,
                statusCode:err.statusCode || 500
            },null):
            callback(null,data);
        });
    };

    /**
     * @description sends email to the client to reset password
     * @param {String} email 
     * @param {callback} callback 
     */
    forgotpass=(email,callback)=>{
        userModel.getUser(email,(err,data)=>{
            if(err){
                callback({
                    message:err.message,
                    statusCode:err.statusCode || 500
                });
            }
            else{
                createEmail({
                    email:data.email,
                    subject:"Reset Password Link",
                    html:`<a href='http://localhost:3000/reset/bearer ${generateToken({
                        email:data.email,
                        _id:data._id,
                        expiresIn:"600s"
                    })}'>click here</a>`,
                    text:"reset password"
                });
                callback(null,{
                    message:"email sent successfully"
                });
            }
        });
    };

    /**
     * @description resets the password for the user
     * @param {Object} body 
     * @param {callback} callback 
     */
    reset=(body,callback)=>{
        userModel.reset(body._id,body,(err,data)=>{
            err ?
            callback({
                message:err.message,
                statusCode:err.statusCode || 500
            },null):
            callback(null,data);
        });
    };
    findAllUser = async () => {
        try {
          let data = await redis.getUser("user")
          if(data === null){
            data = await userModel.findAllUser();
            await redis.setUser("user",JSON.stringify(data))
          }
          await redis.closeConnection();
          return JSON.parse(data);
        } catch (error) {
          throw error;
        }
      };
}

//exporting the object of userService
module.exports=new UserService();