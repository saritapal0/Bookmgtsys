const express = require('express');
const router = express.Router();
const service = require('../../services/purchase/purchase_services')

//Record a book purchase.
//http://localhost:3000/api/purchase/addpurchase/

router.post('/addpurchase',async(req,res)=>{
    await service.addpuchase(req.body)
   res.status(201).send('created successfully')
})
module.exports = router;