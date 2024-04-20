const express = require('express');
const router = express.Router();
const service = require('../../services/carts/carts_sevices')


//Retrieve the current contents of the client's cart
//http://localhost:3000/api/carts/getcart/cart_id

router.get('/getcart/:cart_id',async(req,res)=>{
    const carts = await service.getcartById(req.params.cart_id)
    if(carts.length == 0)
    res.status(404).json('no record id:'+req.params.cart_id)
    res.send(carts)
   })

//http://localhost:3000/api/carts/addcart/

router.post('/addcart',async(req,res)=>{
     await service.addcart(req.body)
    res.status(201).send('created successfully')
})

//http://localhost:3000/api/carts/removecart/

router.post('/removecart',async(req,res)=>{
   await service.removecart(req.body)
  res.status(201).send('remove successfully')
})

//http://localhost:3000/api/carts/emptycart/

router.post('/emptycart',async(req,res)=>{
   await service.emptycart(req.body)
  res.status(201).send('cart is empty')
})
module.exports = router;