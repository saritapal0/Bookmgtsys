const multer = require('../multer/multer')
const cloudinary = require('../Cloud/cloudinary')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
  storage,
})
