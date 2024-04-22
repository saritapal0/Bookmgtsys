const express = require('express');
const router = express.Router();
const service = require('../../services/sales/sales_sevices');
const ResponseManager = require('../../response/responseManager');

//Record a book sale.
//http://localhost:3000/api/sales/addsale/

router.post('/addsale',async(req,res)=>{
    if (!req.body.sale_date) {
        return ResponseManager.statusError(502).sendError({ error: "sale_date Required" });
    }
    if (!req.body.sale_price) {
        return ResponseManager.statusError({ error: "sale_price Required" });
    }
    await service.addsale(req.body)
   ResponseManager.statusError(201).sendSuccess('created successfully')
})
module.exports = router;