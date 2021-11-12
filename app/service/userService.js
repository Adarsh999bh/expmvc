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
                    statusCode:err.statusCode
                },null);
            }
            else{
                if(bcrypt.compareSync(body.password,data.password)){
                    //token gen
                    //return login success with token

                    return callback(null,{
                        token:generateToken({
                            email:data.email,
                            _id:data._id
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
                statusCode:err.statusCode
            },null):
            callback(null,data);
        });
    };

    updateUser=(userID,body,callback)=>{

        userModel.updateUser(userID,body,(err,data)=>{
            err ?
            callback({
                message:err.message,
                statusCode:err.statusCode
            },null):
            callback(null,data);
        });
    };

    deleteUser=(userID,callback)=>{

        userModel.deleteUser(userID,(err,data)=>{
            err ?
            callback({
                message:err.message,
                statusCode:err.statusCode
            },null):
            callback(null,data);
        });
    };
    getUser=(email,callback)=>{
        userModel.getUser(email,(err,data)=>{
            err ?
            callback({
                message:err.message,
                statusCode:err.statusCode
            },null):
            callback(null,data);
        });
    };

    forgotpass=(email,callback)=>{
        userModel.getUser(email,(err,data)=>{
            if(err){
                callback({
                    message:err.message,
                    statusCode:err.statusCode
                });
            }
            else{
                createEmail({
                    to:data.email,
                    subject:"Reset Password Link",
                    text:`<a href="http://localhost:4000/user/reset/${generateToken({
                        email:data.email,
                        _id:data._id
                    })}"</a>`
                });
                console.log(data);
                callback(null,{
                    message:"email sent successfully"
                });
            }
        });
    };
}

module.exports=new UserService();