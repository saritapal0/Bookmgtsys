const express = require('express');
const multer  = require('multer');
const router = express();

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'multer/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

 const upload = multer({ storage: storage });

// // Set up a route to handle file uploads
router.post('/upload',(req, res) => {
 // req.file contains information about the uploaded file
  console.log(req.file);
  res.send('File uploaded successfully');
});

// // Set up a route to serve the upload form
// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

module.exports= router;
