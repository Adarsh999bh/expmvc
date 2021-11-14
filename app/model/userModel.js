const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: {
      type: Number,
      min: 1,
      max: 100,
    },
    email: {
      type: String,
      unique: true,   
      required: true, 
    },
    password: String,
  },
  {
    timestamps: true,
  }
);


const myUser = mongoose.model("FundooNoteUser", userSchema);


class UserModel{

    loginUser = (body,callback)=>{
        return myUser.findOne({email:body.email}, (err,data) => {
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null) : 
            data === null ? 
            callback({
                message:"email ID is not present",
                statusCode:401
            },null) : 
            callback(null,data);
        });
    };

    createUser = (body,callback)=>{
        let encryptedPassword=bcrypt.hashSync(body.password,10);
        console.log(encryptedPassword);
        let user=new myUser({
            firstName: body.firstName,
            lastName: body.lastName,
            age: body.age,
            email: body.email,
            password: encryptedPassword
        });
        return user.save((err,data)=>{
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null) : 
            callback(null,data);
        });
    };

    reset=(userID,body,callback)=>{
        let encryptedPassword=bcrypt.hashSync(body.password,10);
        myUser.findByIdAndUpdate(
            userID,
            {
                password:encryptedPassword
            },
            {
                new:true
            },
            (err,data)=>{
                err ?
                callback({
                    message:err,
                    statusCode:500
                },null):
                callback(null,data);
            }
        );
    };

    updateUser = (userID,body,callback) => {

        myUser.findByIdAndUpdate(
            userID,
            {
              firstName: body.firstName,
              lastName: body.lastName,
              age: body.age,
              email: body.email,
            },
            { 
                new: true 
            },
            (err, data) => {
              return err ? 
              callback({
                  message:err,
                  statusCode:500
              }, null) : 
              callback(null, data);
            }
        );
    };

    deleteUser = (userID,callback) => {
        return myUser.findByIdAndRemove(userID,(err,data)=>{
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null):
            callback(null,data);
        });
    };

    getUser = (email,callback) =>{
        return myUser.findOne({email:email},(err,data)=>{
            return err ? 
            callback({
                message:err,
                statusCode:500
            },null): 
            data===null ? 
            callback({
                message:"email not found",
                statusCode:404
            },null):
            callback(null,data);
        });
    };
}

module.exports=new UserModel();