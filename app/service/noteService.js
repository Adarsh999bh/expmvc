/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon noteService.js              
 * @descrition      : set up the server and connects to the database
 * @file            : noteService.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//importing required modules
const noteModel = require('../model/noteModel');

class NoteService {

    /**
     * @description create note service layer
     * @param {Object} body 
     * @param {callback} callback 
     */
    createNote = (body, callback) => {
        noteModel.createNote(body, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        });
    };

    /**
     * @description get note service layer
     * @param {Object} body 
     * @param {callback} callback 
     */
     getNote=(body,callback)=>{
        noteModel.getNote(body._id,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };

    /**
     * @description update note service layer
     * @param {Object} body 
     * @param {function} callback 
     */
    updateNote = (body, callback) => {
        noteModel.updateNote(body.cardId, body.title, body.content, body.trash, body.color, body.image, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        });
    };

    /**
     * @description delete note service layer
     * @param {Object} body 
     * @param {function} callback 
     */
    deleteNote = (body, callback) => {
        noteModel.deleteNote(body.cardId, (err, data) => {
            err ?
                callback(err, null) :
                callback(null, data);
        });
    };

}
module.exports = new NoteService();