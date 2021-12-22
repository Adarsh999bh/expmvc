/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const userService = require('../service/userService')
const { validationResult } = require("express-validator");
const logger = require('../../config/logger');


class UserController {

    /**
     * @description handles request and response login user
     * @param {Object} req 
     * @param {Object} res 
     */
    loginUser = (req, res) => {
        let body = req.body;
        userService.loginUser(body, (err, data) => {
            if (err) {
                //logg error here
                logger.error(err);
                res.status(err.statusCode).send(err.message);
            }
            else {
                //logg success here
                logger.info("Login successfull")
                res.status(200).send(data);
            }
        });

    };

    /**
     * @description handles request and response to create user
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     */
    createUser = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        let body = req.body;
        userService.createUser(body, (err, data) => {
            if (err) {
                //log error here
                logger.error(err);
                res.status(err.statusCode).send(err.message);
            }
            else {
                //logg success here
                logger.info("User creation api success");
                res.status(200).send(data);
            }
        });
    };

 /**
 * @description Handles request and response for finding all user
 * @param {Object} req
 * @param {Object} res
 */
    findAllUser = async (req, res) => {
        try {
            let data = await userService.findAllUser()
            logger.info("Retrieval successfull");
            return res.status(200).send(data);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(error);
        }
    };

    /**
     * @description handles request and response to update user
     * @param {Object} req 
     * @param {Object} res 
     */
    updateUser = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors);
            res.status(400).json({ errors: errors.array() });
        }
        let body = req.body;
        let userID = req.params.userID;
        userService.updateUser(userID, body, (err, data) => {
            if (err) {
                //logg error here
                logger.error(err);
                res.status(err.statusCode).send(err.message);
            }
            else {
                //logg success here
                logger.info("User update api success");
                res.status(200).send(data);
            }
        });
    };

    /**
     * @description handles request and response for delete user
     * @param {Object} req 
     * @param {Object} res 
     */
    deleteUser = (req, res) => {
        let userID = req.params.userID;
        userService.deleteUser(userID, (err, data) => {
            if (err) {
                //logg error here
                logger.error(err);
                res.status(err.statusCode).send(err.message);
            }
            else {
                //logg successful deletion here
                logger.info("delete user successfull");
                res.status(204).send(data);
            }
        });
    };

    /**
     * @description handles request and response get user
     * @param {Object} req 
     * @param {Object} res 
     */
    getUser = (req, res) => {
        userService.getUser(req.body.email, (err, data) => {
            if (err) {
                //logg error here
                logger.error(err);
                res.status(err.statusCode).send(err.message);
            }
            else {
                //logg get successs here
                logger.info("get user api success");
                res.status(200).send(data);
            }
        });
    };

    /**
     * @description handles request and response forgot password
     * @param {Object} req 
     * @param {Object} res 
     */
    forgotpass = (req, res) => {
        userService.forgotpass(req.body.email, (err, data) => {
            if (err) {
                logger.error(err);
                res.status(err.statusCode).send(err.message);
            }
            else {
                logger.info("email sent successfully");
                res.status(200).send(data);
            }
        });
    };

    /**
     * @description handles request and response for reset password
     * @param {Object} req 
     * @param {Object} res 
     */
    reset = (req, res) => {
        userService.reset(req.body, (err, data) => {
            if (err) {
                logger.error(err);
                res.status(err.statusCode).send(err.message);
            }
            else {
                logger.info("resetted password successfully");
                res.status(200).send("password resetted");
            }
        });
    };
}

module.exports = new UserController();