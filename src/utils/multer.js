const multer = require("multer");
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|bmp|webp|tiff|svg/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb("Error: el tipo de archivo no esta permitido -" + fileTypes); 
    }
})

