const express = require('express');
const router = express.Router();
const service = require('../../services/orderhistory/orderhistory_services')

//Retrieve the order history for a specific client.
//http://localhost:3000/api/orderhistory/getorderhistory/

router.get('/getorderhistory:client_id',async(req,res)=>{
  const orderhistory = await service.getorderhistoryByClientID()
  res.send(orderhistory)
})

//Retrieve details of a specific order by ID
//http://localhost:3000/api/orderhistory/getorderhistory/order_id

router.get('/getorderhistory/:order_id',async(req,res)=>{
    const orderhistory = await service.getorderhistory(req.params.order_id)
    if(orderhistory.length == 0) res.status(404).json('no record id:'+req.params.id)
    res.send(orderhistory)
   })

module.exports = router;