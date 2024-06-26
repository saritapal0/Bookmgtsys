const express = require("express");
const router = express.Router();
const service = require("../../services/carts/carts_sevices");
const ResponseManager = require("../../response/responseManager");
const multer = require("multer")
const fileuploader = require("../../Cloud/cloudinary");
const { image } = require("../../Cloud/upload");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});


router.get("/getcart", async (req, res) => {
  const carts = await service.getcart();
  ResponseManager.sendSuccess(res, carts);
  return;
});

router.post("/addcart", upload.single("image"), async (req, res) => {
  const fileBuffer = req.file.buffer;
  const formData = req.body;

  fileuploader.uploadMedia(fileBuffer).then((imageUrl)=>{
    const newCartData = {...formData,image:imageUrl};
    return service.addcart(newCartData)
  }).then((Data)=>ResponseManager.sendSuccess(res,Data))
  .catch((err)=>ResponseManager.sendError(res,err.message))
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


