const userService=require('../service/userService')
const { validationResult } = require("express-validator");
const logger = require('../../config/logger');


class UserController{

    loginUser=(req,res)=>{
        let body = req.body;
        userService.loginUser(body,(err,data)=>{
            if(err){
                //logg error here
                logger.error(err);
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg success here
                logger.info("Login successfull")
                console.log(data);
                res.status(200).send(data);
            }
        });

    };

    createUser=(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors);
            console.log("in create validation error");
            res.status(400).json({ errors: errors.array() });
        }
        let body=req.body;
        userService.createUser(body,(err,data)=>{
            if(err){
                //log error here
                logger.error(err);
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg success here
                logger.info("User creation api success");
                console.log(data);
                res.status(200).send(data);
            }
        });
    };

    updateUser=(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors);
            console.log("in update validatiopn error");
            res.status(400).json({ errors: errors.array() });
        }
        let body=req.body;
        let userID=req.params.userID;
        userService.updateUser(userID,body,(err,data)=>{
            if(err){
                //logg error here
                logger.error(err);
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg success here
                logger.info("User update api success");
                console.log(data);
                res.status(200).send(data);
            }
        });
    };

    deleteUser=(req,res)=>{
        let userID=req.params.userID;
        console.log(userID);
        userService.deleteUser(userID,(err,data)=>{
            if(err){
                //logg error here
                logger.error(err);
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg successful deletion here
                logger.info("delete user successfull");
                console.log(data);
                res.status(204).send(data);
            }
        });
    };

    getUser=(req,res)=>{
        userService.getUser(req.body.email,(err,data)=>{
            if(err){
                //logg error here
                logger.error(err);
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                //logg get successs here
                logger.info("get user api success");
                console.log(data);
                res.status(200).send(data);
            }
        });
    };

    forgotpass=(req,res)=>{
        userService.forgotpass(req.body.email,(err,data)=>{
            if(err){
                logger.error(err);
                console.log(err);
                res.status(err.statusCode).send(err.message);
            }
            else{
                logger.info("email sent successfully");
                console.log(data);
                res.status(200).send(data);
            }
        });
    };
}

module.exports=new UserController();