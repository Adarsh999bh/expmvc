/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : multer.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 9-Nov-2021
 * 
 **************************************************************************/

//importing multer module
const multer = require("multer");

//importing path module
const path = require("path");


/**
 * @description creates multer disk storage object allocates 
 * memory for incoming files through routes
 * @returns multer storage object
 */
const multerStorage = () => {
  //creating multer disk storage object
  const storage = multer.diskStorage({
    destination: "./uploads/images/",
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  //returning multer storage for single file
  return multer({
    storage: storage,
  }).single("image");
};

//exporting multer storage
module.exports = multerStorage;