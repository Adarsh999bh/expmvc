/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/
const LabelService=require('../service/labelService');
const logger=require('../../config/logger');

class LabelController{

    /**
     * @description handles request and response create label
     * @param {Object} req 
     * @param {Object} res 
     */
    createLabel=async (req,res)=>{
        try {
            let data=await LabelService.createLabel(req.body);
            logger.info("label created successfully");
            res.status(200).send(data);
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    };

    /**
     * @description handles request and response get label
     * @param {Object} req 
     * @param {Object} res 
     */
    getLabel=async (req,res)=>{
        try {
            let data=await LabelService.getLabel(req.body);
            
            logger.info("get label request successful");
            res.status(200).send(data);
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    };

    /**
     * @description handles request and response update label
     * @param {Object} req 
     * @param {Object} res 
     */
    updateLabel=async (req,res)=>{
        try {
            let data=await LabelService.updateLabel(req.body);
            logger.info("update label request successful");
            res.status(200).send(data);
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    }

    /**
     * @description handles request and response for delete label
     * @param {Object} req 
     * @param {Object} res 
     */
    deleteLabel=async (req,res)=>{
        try {
            let data=await LabelService.deleteLabel(req.body);
            logger.info("label deleted successfully");
            res.status(200).send(data);
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    };

}
module.exports=new LabelController();