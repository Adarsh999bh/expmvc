const noteModel = require('../model/noteModel');
const NoteModel=require('../model/noteModel');

class NoteService{
    createNote=(body,callback)=>{
        noteModel.createNote(body,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };

    getNote=(body,callback)=>{
        noteModel.getNote(body._id,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };

    updateNote=(body,callback)=>{
        noteModel.updateNote(body.cardId,body.title,body.content,body.trash,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };

    deleteNote=(body,callback)=>{
        noteModel.deleteNote(body.cardId,(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data);
        });
    };

}
module.exports=new NoteService();