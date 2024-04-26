const multer = require('multer');
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null,'uploads/') // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Specify the filename for uploaded files
  }
});

const upload = multer({ storage: storage });
module.exports = router