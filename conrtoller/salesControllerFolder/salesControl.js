const express = require('express');
const router = express.Router();
const service = require('../../services/sales/sales_sevices')

//Record a book sale.
//http://localhost:3000/api/sales/addsale/

router.post('/addsale',async(req,res)=>{
    if (!req.body.sale_date) {
        return res.status(502).send({ error: "sale_date Required" });
    }
    if (!req.body.sale_price) {
        return res.status(502).send({ error: "sale_price Required" });
    }
    await service.addsale(req.body)
   res.status(201).send('created successfully')
})
module.exports = router;