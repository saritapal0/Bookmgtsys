const express = require('express');
const router = express.Router();
const cloudinary = require('../../Cloud/cloudinary')
const service = require("../../services/carts/carts_sevices")


router.post('/upload',function(req,res){
   cloudinary.uploader.upload(req.file.path,function(err,result){
    if(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error"
        })
    }

    res.status(200).json({
        success:true,
        message:"Uploaded",
        data:"result"

   })
})
})
module.exports = router
