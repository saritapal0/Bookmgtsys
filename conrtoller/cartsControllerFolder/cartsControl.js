const express = require("express");
const router = express.Router();
const cloudinary = require('../../Cloud/cloudinary')
const uploadfile = require('../../multer/multer')
const service = require("../../services/carts/carts_sevices");
const ResponseManager = require("../../response/responseManager");


router.get("/getcart", async (req, res) => {
   const carts = await service.getcart();
  ResponseManager.sendSuccess(res,carts);
  return;
});

router.post("/addcart",async(req, res) => {
  const affectedRows = await service.addcart(req.body)
 if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
 else ResponseManager.sendSuccess(res,"added successful");
});

router.put("/updatecart/:cart_id", async (req, res) => {
  const affectedRows = await service.updatecart(req.body,req.params.cart_id);
  if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
  else ResponseManager.sendSuccess(res,"updated successful");
});

router.delete("/deletecart/:cart_id", async (req, res) => {
  const affectedRows = await service.deletecart(req.params.cart_id);
  if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
  ResponseManager.sendSuccess(res,"delete successful");;
});
module.exports = router;