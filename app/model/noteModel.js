const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    title:String,
    content:String,
    trash:Boolean,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FundooNoteUser"
    }
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
            userId:body._id
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

    updateNote=(_id,title,content,trash,callback)=>{
        FundooNote.findByIdAndUpdate(
            _id,
            {
                title:title,
                content:content,
                trash:trash
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
                err ?
                callback(err,null):
                callback(null,data);
            }
        );
    };

}
module.exports=new NoteModel();