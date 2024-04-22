const express = require('express');
const router = express.Router();
const service = require('../../services/orderhistory/orderhistory_services');
const ResponseManager = require('../../response/responseManager');

//Retrieve the order history for a specific client.
//http://localhost:3000/api/orderhistory/getorderhistory/

router.get('/getorderhistory:client_id',async(req,res)=>{
  const orderhistory = await service.getorderhistoryByClientID()
  ResponseManager.sendSuccess(res,orderhistory)
})

//Retrieve details of a specific order by ID
//http://localhost:3000/api/orderhistory/getorderhistory/order_id

router.get('/getorderhistory/:order_id',async(req,res)=>{
    const orderhistory = await service.getorderhistoryById(req.params.order_id)
    if(orderhistory.length == 0) ResponseManager.statusError(404).json('no record id:'+req.params.id)
    ResponseManager.sendSuccess(res,orderhistory)
   })

module.exports = router;