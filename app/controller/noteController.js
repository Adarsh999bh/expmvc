/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const NoteService=require('../service/noteService');
const logger=require('../../config/logger');
const noteService = require('../service/noteService');
const multerStorage=require('../../utility/createMulter');

class NoteController{
    /**
     * @description handles request and response for create Note
     * @param {Object} req 
     * @param {Object} res 
     */
    createNote=(req,res)=>{
        NoteService.createNote(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("create note success");
                res.status(200).send(data);
            }
        });
    };

    /**
     * @description handles request and response for get note
     * @param {Object} req 
     * @param {Object} res 
     */
    getNote=(req,res)=>{
        noteService.getNote(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("get notes success");
                res.status(200).send(data);
            }
        });
    };

    /**
     * @description handles request and response update note
     * @param {Object} req 
     * @param {Object} res 
     */
    updateNote=(req,res)=>{
        noteService.updateNote(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("update note success");
                res.status(200).send(data);
            }
        });
    };

    /**
     * @description handles request and response delete note
     * @param {Object} req 
     * @param {Object} res 
     */
    deleteNote=(req,res)=>{
        noteService.deleteNote(req.body,(err,data)=>{
            if(err){
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                logger.info("create note success");
                res.status(200).send(data);
            }
        });
    };

    /**
     * @description handles request and response upload image
     * @param {Object} req 
     * @param {Object} res 
     */
    uploadImage = (req, res) => {
        const upload = multerStorage();
        upload(req, res, (err) => {
          if (err) {
            logger.error("Could not upload image", err);
            res.status(400).send(err);
          } else {
            logger.info(res);
            res.status(200).send(req.file);
          }
        });
      };
}

module.exports=new NoteController();