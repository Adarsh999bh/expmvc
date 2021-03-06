/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
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


class UserModel {

    /**
    * @description updates user details
    * @param {Object} body 
    * @param {function} callback 
    * @returns user
    */
    loginUser = (body, callback) => {
        return myUser.findOne({ email: body.email }, (err, data) => {
            return err ?
                callback({
                    message: err,
                    statusCode: 500
                }, null) :
                data === null ?
                    callback({
                        message: "email ID is not present",
                        statusCode: 401
                    }, null) :
                    callback(null, data);
        });
    };

    /**
     * @description creates user
     * @param {Object} body 
     * @param {function} callback 
     */
    createUser = (body, callback) => {
        let encryptedPassword = bcrypt.hashSync(body.password, 10);
        let user = new myUser({
            firstName: body.firstName,
            lastName: body.lastName,
            age: body.age,
            email: body.email,
            password: encryptedPassword
        });
        return user.save((err, data) => {
            return err ?
                callback({
                    message: err,
                    statusCode: 500
                }, null) :
                callback(null, data);
        });
    };

    /**
     * @description resets user password
     * @param {String} userID 
     * @param {Object} body 
     * @param {function} callback 
     */
    reset = (userID, body, callback) => {
        let encryptedPassword = bcrypt.hashSync(body.password, 10);
        myUser.findByIdAndUpdate(
            userID,
            {
                password: encryptedPassword
            },
            {
                new: true
            },
            (err, data) => {
                err ?
                    callback({
                        message: err,
                        statusCode: 500
                    }, null) :
                    callback(null, data);
            }
        );
    };

 /**
 *@description model function for finding all user in database
 * @param {callback} callback
 * @returns err or data
 */
    findAllUser = async () => {
        try {
            let data = await myUser.find();
            return data;
        } catch (error) {
            throw error;
        }
    };
    

    /**
     * @description updates user details
     * @param {String} userID 
     * @param {Object} body 
     * @param {function} callback 
     */
    updateUser = (userID, body, callback) => {

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
                        message: err,
                        statusCode: 500
                    }, null) :
                    callback(null, data);
            }
        );
    };

    /**
     * @description deletes user
     * @param {String} userID 
     * @param {function} callback 
     * @returns deleted user
     */
    deleteUser = (userID, callback) => {
        return myUser.findByIdAndRemove(userID, (err, data) => {
            return err ?
                callback({
                    message: err,
                    statusCode: 500
                }, null) :
                callback(null, data);
        });
    };

    /**
     * 
     * @param {*} email 
     * @param {*} callback 
     * @returns 
     */
    getUser = (email, callback) => {
        return myUser.findOne({ email: email }, (err, data) => {
            return err ?
                callback({
                    message: err,
                    statusCode: 500
                }, null) :
                data === null ?
                    callback({
                        message: "email not found",
                        statusCode: 404
                    }, null) :
                    callback(null, data);
        });
    };
}

module.exports = new UserModel();