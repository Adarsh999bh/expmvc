const userModel=require('../model/userModel');
const bcrypt=require('bcrypt');


class UserService{

    loginUser=(body,callback)=>{
        userModel.loginUser(body,(err,data)=>{
            if(err){
                return callback(err,null);
            }
            else{
                if(bcrypt.compareSync(body.password,data.password)){
                    //token gen
                    //return login success with token

                    return callback(null,data);
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
            callback(err,null):
            callback(null,data);
        });
    };

    updateUser=(userID,body,callback)=>{

        userModel.updateUser(userID,body,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };

    deleteUser=(userID,callback)=>{

        userModel.deleteUser(userID,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };
    getUser=(email,callback)=>{
        userModel.getUser(email,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };
}

module.exports=new UserService();