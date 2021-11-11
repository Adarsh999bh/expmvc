const userService=require('../service/userService')
const { validationResult } = require("express-validator");


class UserController{

    loginUser=(req,res)=>{
        let body = req.body;
        userService.loginUser(body,(err,data)=>{
            if(err){
                //logg error here
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg success here
                console.log(data);
                res.status(200).send(data);
            }
        });

    };

    createUser=(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("in create validatiopn error");
            res.status(400).json({ errors: errors.array() });
        }
        let body=req.body;
        userService.createUser(body,(err,data)=>{
            if(err){
                //log error here
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg success here
                console.log(data);
                res.status(200).send(data);
            }
        });
    };

    updateUser=(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("in update validatiopn error");
            res.status(400).json({ errors: errors.array() });
        }
        let body=req.body;
        let userID=req.params.userID;
        userService.updateUser(userID,body,(err,data)=>{
            if(err){
                //logg error here
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg success here
                console.log(data);
                res.status(200).send(data);
            }
        });
    };

    deleteUser=(req,res)=>{
        let userID=req.params.userID;
        userService.deleteUser(userID,(err,data)=>{
            if(err){
                //logg error here
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg successful deletion here
                console.log(data);
                res.status(204).send(data);
            }
        });
    };

    getUser=(req,res)=>{
        userService.getUser(req.body.email,(err,data)=>{
            if(err){
                //logg error here
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg get successs here
                console.log(data);
                res.status(200).send(data);
            }
        });
    };
}

module.exports=new UserController();