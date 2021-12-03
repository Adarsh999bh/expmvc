const mongoose = require("mongoose");
const { promisify } = require("util");
const fs = require("fs");
const unlinkAsync = promisify(fs.unlink);
const logger=require('../../config/logger')
const noteSchema = mongoose.Schema({
    title:String,
    content:String,
    trash:Boolean,
    color:String,
    imgFile:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FundooNoteUser"
    },
},{
    timestamps:true
});

const FundooNote=mongoose.model("FundooNote",noteSchema);

class NoteModel{
    createNote=(body,callback)=>{
        let note=new FundooNote({
            title:body.title || "undefined",
            content:body.content,
            trash:body.trash,
            userId:body._id,
            imgFile:"",
        });
        note.save((err,data)=>{
            err ? 
            callback(err,null):
            callback(null,data);
        });
    };

    getNote=(_id,callback)=>{
        FundooNote.find({userId:_id},(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data.reverse());
        });
    };

    updateNote=(_id,title,content,trash,color,image,callback)=>{
        FundooNote.findByIdAndUpdate(
            _id,
            {
                title:title,
                content:content,
                trash:trash,
                color:color,
                imgFile:image,
            },
            {
                new:true
            },
            (err,data)=>{
                err ?
                callback(err,null):
                callback(null,data);
            }
        );
    };

    deleteNote=(_id,callback)=>{
        FundooNote.findByIdAndDelete(
            _id,
            (err,data)=>{
                if(err){
                    callback(err,null)
                }
                else{
                    unlinkAsync(
                        `C:\\Users\\adarsh.bhandary_ymed\\Desktop\\bridgelabz\\expmvc\\uploads\\images\\${data.imgFile}`,
                        (err, res) => {
                          if (err) {
                            logger.error(err);
                          }
                        }
                    );
                }
                callback(null,data);
            }
        );
    };

}
module.exports=new NoteModel();