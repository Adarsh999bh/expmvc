const LabelService=require('../service/labelService');
const logger=require('../../config/logger');

class LabelController{
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