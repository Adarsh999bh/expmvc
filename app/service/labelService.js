/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const LabelModel=require('../model/labelModel');

class LabelService{

    /**
     * @description creates label
     * @param {Object} body 
     * @returns created label
     */
    createLabel=async (body)=>{
        try {
            return await LabelModel.createLabel(body.label,body._id);
        } catch (error) {
            throw error;
        }
    };

    /**
     * @description gets label
     * @param {Object} body 
     * @returns label
     */
    getLabel=async (body)=>{
        try {
            return await LabelModel.getLabel(body._id);
        } catch (error) {
            throw error;
        }
    };

    /**
     * @description updates label
     * @param {Object} body 
     * @returns updated label
     */
    updateLabel=async (body)=>{
        try {
            return await LabelModel.updateLabel(body.label,body.labelId);
        } catch (error) {
            throw error;
        }
    };
    
    /**
     * @description deletes label
     * @param {Object} body 
     * @returns deleted label
     */
    deleteLabel=async (body)=>{
        try {
            return await LabelModel.deleteLabel(body.labelId);
        } catch (error) {
            throw error;
        }
    };
}

module.exports=new LabelService();