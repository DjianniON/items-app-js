let multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, new Date().toISOString().replace(/:/g, '-') + name);
  }
});

const fileFilter = (req, file, callback) => {
  if (
     file.mimetype === "image/jpg" ||
     file.mimetype === "image/jpeg" ||
     file.mimetype === "image/png"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = multer({storage: storage}).single('img');