import multer = require("multer");
let imageName;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        imageName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname.trim()
       cb(null, imageName);
    },
  });
  
 export const upload = multer({ storage });