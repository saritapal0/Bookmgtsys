const express = require('express');
const router = express.Router();
const service = require('../../services/purchase/purchase_services');
const ResponseManager = require('../../response/responseManager');

//Record a book purchase.
//http://localhost:3000/api/purchase/addpurchase/

router.post('/addpurchase',async(req,res)=>{
    if (!req.body.purchase_date) {
        return ResponseManager.statusError(502).sendError({ error: "purchase_date Required" });
    }
    await service.addpurchase(req.body)
   ResponseManager.statusError(201).sendSuccess(res,'created successfully')
})
module.exports = router;