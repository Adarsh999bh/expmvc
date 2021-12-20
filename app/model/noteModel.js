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
    /**
     * @description creates note
     * @param {String} body 
     * @param {function} callback 
     */
    createNote=(body,callback)=>{
        let note=new FundooNote({
            title:body.title || "undefined",
            content:body.content,
            trash:body.trash,
            userId:body._id,
            imgFile:"",
            color:"rgb(215, 255, 255)"
        });
        note.save((err,data)=>{
            err ? 
            callback(err,null):
            callback(null,data);
        });
    };

    /**
     * @description gets note
     * @param {String} _id 
     * @param {function} callback 
     */
    getNote=(_id,callback)=>{
        FundooNote.find({userId:_id},(err,data)=>{
            err ?
            callback(err,null):
            callback(null,data.reverse());
        });
    };

    /**
     * @description updates the note
     * @param {String} _id 
     * @param {String} title 
     * @param {String} content 
     * @param {Boolean} trash 
     * @param {String} color 
     * @param {String} image 
     * @param {function} callback 
     */
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

    /**
     * @description deletes note
     * @param {String} _id 
     * @param {function} callback 
     */
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