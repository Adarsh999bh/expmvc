const LabelModel=require('../model/labelModel');

class LabelService{

    createLabel=async (body)=>{
        try {
            return await LabelModel.createLabel(body.label,body._id);
        } catch (error) {
            throw error;
        }
    };

    getLabel=async (body)=>{
        try {
            return await LabelModel.getLabel(body._id);
        } catch (error) {
            throw error;
        }
    };

    updateLabel=async (body)=>{
        try {
            return await LabelModel.updateLabel(body.label,body.labelId);
        } catch (error) {
            throw error;
        }
    };
    
    deleteLabel=async (body)=>{
        try {
            return await LabelModel.deleteLabel(body.labelId);
        } catch (error) {
            throw error;
        }
    };
}

module.exports=new LabelService();