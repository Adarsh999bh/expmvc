const NoteService=require('../service/noteService');
const logger=require('../../config/logger');
const noteService = require('../service/noteService');

class NoteController{
    createNote=(req,res)=>{
        NoteService.createNote(req.body,(err,data)=>{
            if(err){
                console.log(err)
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                console.log(data);
                logger.info("create note success");
                res.status(200).send(data);
            }
        });
    };
    getNote=(req,res)=>{
        console.log(req);
        noteService.getNote(req.body,(err,data)=>{
            if(err){
                console.log(err)
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                console.log(data);
                logger.info("get notes success");
                res.status(200).send(data);
            }
        });
    };

    updateNote=(req,res)=>{
        noteService.updateNote(req.body,(err,data)=>{
            if(err){
                console.log(err)
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                console.log(data);
                logger.info("update note success");
                res.status(200).send(data);
            }
        });
    };

    deleteNote=(req,res)=>{
        noteService.deleteNote(req.body,(err,data)=>{
            if(err){
                console.log(err)
                logger.error(err);
                res.status(500).send(err);
            }
            else{
                console.log(data);
                logger.info("create note success");
                res.status(200).send(data);
            }
        });
    };
}

module.exports=new NoteController();