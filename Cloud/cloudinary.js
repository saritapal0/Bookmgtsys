const cloudinary = require("../Cloud/upload");

module.exports.uploadMedia = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, async (err, result) => {
        if (err) {
          console.error(err);
          reject("uploading fail");
        } else {
          const imageUrl = result.secure_url;
          resolve(imageUrl);
        }
      })
      .end(fileBuffer);
  });
};
