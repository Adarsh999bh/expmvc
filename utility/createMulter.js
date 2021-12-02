const multer = require("multer");
const path = require("path");

const multerStorage = () => {
  const storage = multer.diskStorage({
    destination: "./uploads/images/",
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  return multer({
    storage: storage,
  }).single("image");
};

module.exports = multerStorage;