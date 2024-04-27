const express = require("express");
const router = express.Router();
const service = require("../../services/carts/carts_sevices");
const ResponseManager = require("../../response/responseManager");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../../Cloud/cloudinary");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "upload/cart",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

router.get("/getcart", async (req, res) => {
  const carts = await service.getcart();
  ResponseManager.sendSuccess(res, carts);
  return;
});

router.post("/addcart", upload.single("cart"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "cart");
  if (req.method === "post") {
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      msg: "cart uploaded successfully",
      data: ulrs,
    });
  } else {
    res.status(405).json({
      err:"cart not uploaded successfully"
    });
  }

  // const affectedRows = await service.addcart(req.body);
  // if (affectedRows == 0)
  //   ResponseManager.statusError(404).json("no record id:" + req.params.id);
  // else ResponseManager.sendSuccess(res, "added successful");
});

router.put("/updatecart/:cart_id", async (req, res) => {
  const affectedRows = await service.updatecart(req.body, req.params.cart_id);
  if (affectedRows == 0)
    ResponseManager.statusError(404).json("no record id:" + req.params.id);
  else ResponseManager.sendSuccess(res, "updated successful");
});

router.delete("/deletecart/:cart_id", async (req, res) => {
  const affectedRows = await service.deletecart(req.params.cart_id);
  if (affectedRows == 0)
    ResponseManager.statusError(404).json("no record id:" + req.params.id);
  ResponseManager.sendSuccess(res, "delete successful");
});
module.exports = router;
