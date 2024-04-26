const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});
cloudinary.uploader.upload('path_to_image.jpg', function(error, result) {
  if (error) {
      console.error(error);
  } else {
      console.log(result);
  }
});

module.exports= cloudinary;
