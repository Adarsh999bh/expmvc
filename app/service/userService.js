const userModel=require('../model/userModel');
const bcrypt=require('bcrypt');
const {generateToken}=require('../../utility/jwt');
const {createEmail}=require('../../utility/mailer');

class UserService{

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
                console.log(data);
                callback(null,{
                    message:"email sent successfully"
                });
            }
        });
    };
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
}

module.exports=new UserService();