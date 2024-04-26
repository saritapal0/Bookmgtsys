const express = require('express');
const router = express.Router();
const cloudinary = require("../../Cloud/cloudinary");

router.post('/upload', async (req, res) => {
    try {
      // Upload file to Cloudinary
      const result = await cloudinary.upload_stream(req.file.originalname, (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error uploading file to Cloudinary.');
        } else {
          console.log('File uploaded successfully:', result.secure_url);
          res.send('File uploaded successfully.');
        }
      }).end(req.file.buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading file.');
    }
  });
module.exports = router
