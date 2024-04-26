const express = require("express");
const router = express.Router();
const service = require("../../services/carts/carts_sevices");
const ResponseManager = require("../../response/responseManager");


router.get("/", async (req, res) => {
   const carts = await service.getcarts();
  ResponseManager.sendSuccess(res,carts);
  return;
});

router.post("/",async(req, res) => {
   const carts = await service.addcart();
   const affectedRows = await service.addcart(req.body)
   if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
   else ResponseManager.sendSuccess(res,carts);
});

router.put("/:cart_id", async (req, res) => {
  const carts= await service.updatecart();
  const affectedRows = await service.updatecart(req.body,req.params.cart_id);
  if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
  else ResponseManager.sendSuccess(res,carts);
});

router.delete("/:cart_id", async (req, res) => {
  const affectedRows = await service.deletecart(req.params.cart_id);
  if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
  ResponseManager.sendSuccess(res,"delete successful");;
});
module.exports = router;