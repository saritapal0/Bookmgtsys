const express = require('express');
const router = express.Router();
const service = require('../../services/quality/quality_services');
const ResponseManager = require('../../response/responseManager');

//Retrieve a list of all quality options.
//http://localhost:3000/api/quality/getAllquality/

router.get('/getAllquality',async(req,res)=>{
  const quality = await service.getAllquality()
  ResponseManager.sendSuccess(res,quality)
})

//Retrieve details of a specific quality option by ID.
//http://localhost:3000/api/quality/getquality/QualityID

router.get('/getquality/:QualityID',async(req,res)=>{
    const quality = await service.getqualityById(req.params.QualityID)
    if(quality.length == 0)
    ResponseManager.statusError(404).json('no record id:'+req.params.id)
    ResponseManager.sendSuccess(quality)
   })

 //Add a new quality option to the database  
//http://localhost:3000/api/quality/addquality/

router.post('/addquality',async(req,res)=>{
  if (!req.body.QualityName) {
    return ResponseManager.statusError(502).send({ error: "QualityName Required" });
}
     await service.addquality(req.body)
    ResponseManager.statusError(201).sendSuccess('created successfully')
})

////Update details of a specific quality option by ID.
//http://localhost:3000/api/quality/updatequality/QualityID

router.put('/updatequality/:QualityID',async(req,res)=>{
  
  if (!req.body.QualityName) {
    return res.status(502).send({ error: "QualityName Required" });
}
   const affectedRows = await service.updatequality(req.body,req.params.QualityID)
   if(affectedRows == 0)
   res.status(404).json('no record id:'+req.params.id)
   else
   res.send('updated successful')

})

//Delete a quality option from the database.
//http://localhost:3000/api/quality/deletequality/QualityID

router.delete('/deletequality/:QualityID',async(req,res)=>{
    const affectedRows = await service.deletequality(req.params.QualityID)
    if(affectedRows == 0)
    res.status(404).json('no record id:'+req.params.id)
    res.send('delete successful')
   })
module.exports = router;