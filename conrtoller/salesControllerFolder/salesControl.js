const express = require('express');
const router = express.Router();
const service = require('../../services/sales/sales_sevices')

//Record a book sale.
//http://localhost:3000/api/sales/addsale/

router.post('/addsale',async(req,res)=>{
    await service.addsale(req.body)
   res.status(201).send('created successfully')
})
module.exports = router;