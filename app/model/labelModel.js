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
    
    getLabel=async (_id)=>{
        try {
            return await FundooNoteLabel.find({userId:_id});
        } catch (error) {
            throw error;
        }
    };

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

    deleteLabel=async (_id)=>{
        try {
            return await FundooNoteLabel.findByIdAndDelete(_id);
        } catch (error) {
            throw error;
        }
    };
}

module.exports=new LabelModel();