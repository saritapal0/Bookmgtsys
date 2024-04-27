const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadCart(res, req, next) {
  uploadCart.single("cart")(res, req, (err) => {
    if (err) throw err;
    const cartFile = req.file;
    const { origanalname, mimetype, buffer } = cartFile;

    cloudinary.uploader;
    Upload_Stream((err, result) => {
      if (err) throw err;
      const { public_id } = result;
      const  url = cloudinary.url(public_id,{
        width:150,
        height:100,
        crop:'fill'
      })
      const data = {
        name: origanalname,
        type: mimetype,
        url: url,
        public_id: public_id,
      };
    })
     .end(buffer)
  });
}

module.exports = cloudinary;
