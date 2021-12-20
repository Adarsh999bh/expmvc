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
const labelSchema = mongoose.Schema({
    label:{
        type:String,
        required:true,
        unique:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FundooNoteUser"
    },
},{
    timestamps:true
});

const FundooNoteLabel=mongoose.model("FundooNoteLabel",labelSchema);

class LabelModel{
    /**
     * @description creates label
     * @param {String} label 
     * @param {String} _id 
     * @returns new label
     */
    createLabel=async (label,_id)=>{
        try {
            let data=new FundooNoteLabel({
                label:label,
                userId:_id
            });
            return await data.save();
        } catch (error) {
            throw error;
        }
    };
    
    /**
     * @description gets user label
     * @param {String} _id 
     * @returns label
     */
    getLabel=async (_id)=>{
        try {
            return await FundooNoteLabel.find({userId:_id});
        } catch (error) {
            throw error;
        }
    };

    /**
     * @description updates label
     * @param {String} label 
     * @param {String} _id 
     * @returns updated label
     */
    updateLabel=async (label,_id)=>{
        try {
            return await FundooNoteLabel.findByIdAndUpdate(
                _id,
                {
                    label:label,
                },
                {
                    new:true
                }
            );
        } catch (error) {
            throw error;
        }
    };

    /**
     * 
     * @param {String} _id 
     * @returns datString
     */
    deleteLabel=async (_id)=>{
        try {
            return await FundooNoteLabel.findByIdAndDelete(_id);
        } catch (error) {
            throw error;
        }
    };
}

module.exports=new LabelModel();