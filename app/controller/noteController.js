const NoteService=require('../service/noteService');
const logger=require('../../config/logger');
const noteService = require('../service/noteService');
const multerStorage=require('../../utility/createMulter');

class NoteController{
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