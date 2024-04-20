const express = require('express');
const router = express.Router();
const service = require('../../services/carts/carts_sevices')


//Retrieve the current contents of the client's cart
//http://localhost:3000/api/carts/getAllcarts/

router.get('/getAllcarts',async(req,res)=>{
  const carts = await service.getAllcarts()
  res.send(carts)
})

//http://localhost:3000/api/clients/getclient/client_id

router.get('/getcart/:cart_id',async(req,res)=>{
    const clients = await service.getcartById(req.params.cart_id)
    if(carts.length == 0)
    res.status(404).json('no record id:'+req.params.cart_id)
    res.send(carts)
   })

//http://localhost:3000/api/clients/addclient/

router.post('/addclient',async(req,res)=>{
     await service.addclient(req.body)
    res.status(201).send('created successfully')
})

//http://localhost:3000/api/clients/updateclient/client_id

router.put('/updateclient/:client_id',async(req,res)=>{
   const affectedRows = await service.updateclient(req.body,req.params.client_id)
   if(affectedRows == 0)
   res.status(404).json('no record id:'+req.params.id)
   else
   res.send('updated successful')

})

//http://localhost:3000/api/clients/deleteclient/client_id

router.delete('/deleteclient/:client_id',async(req,res)=>{
    const affectedRows = await service.deleteclient(req.params.client_id)
    if(affectedRows == 0)
    res.status(404).json('no record id:'+req.params.id)
    res.send('delete successful')
   })
module.exports = router;