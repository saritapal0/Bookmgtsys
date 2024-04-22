const express = require('express');
const router = express.Router();
const service = require('../../services/booktypes/booktypeservice');
const ResponseManager = require('../../response/responseManager');

//Retrieve a list of all book types.
//http://localhost:3000/api/booktypes/getAllbooktypes

router.get('/getAllbooktypes',async(req,res)=>{
  const booktypes = await service.getAllbooktype()
  ResponseManager.sendSuccess(res,booktypes)
})

//Retrieve details of a specific book type by ID.
//http://localhost:3000/api/booktypes/getbooktypes/typeID

router.get('/getbooktypes/:typeID',async(req,res)=>{
    const booktypes = await service.getbooktypesById(req.params.typeID)
    if(booktypes.length == 0)
    ResponseManager.statusError(404).json('no record id:'+req.params.id)
    ResponseManager.sendSuccess(res,booktypes)
    
   })

 // Add a new book type to the database.
//http://localhost:3000/api/booktypes/addbooktype/

router.post('/addbooktype',async(req,res)=>{
  if (!req.body.TypeName) {
    return ResponseManager.statusError(502).sendError({ error: "TypeName Required" });
}
     await service.addbooktype(req.body)
    ResponseManager.statusError(201).sendSuccess(res,'created successfully')
})


//Update details of a specific book type by ID.
//http://localhost:3000/api/booktypes/updatebooktype/TypeID

router.put('/updatebooktype/:TypeID',async(req,res)=>{
    if (!req.body.TypeName) {
    return ResponseManager.statusError(502).sendError({ error: "TypeName Required" });
}
   const affectedRows = await service.updatebooktype(req.body,req.params.TypeID)
   if(affectedRows == 0)
   ResponseManager.statusError(404).json('no record id:'+req.params.id)
   else
   ResponseManager.sendSuccess(res,'updated successful')

})

//Delete a book type from the database.
//http://localhost:3000/api/booktypes/deletebooktype/TypeID

router.delete('/deletebooktype/:TypeID',async(req,res)=>{
    const affectedRows = await service.deletebooktype(req.params.TypeID)
    if(affectedRows == 0)
    ResponseManager.statusError(404).json('no record id:'+req.params.id)
    ResponseManager.sendSuccess(res,'delete successful')
   })
module.exports = router;