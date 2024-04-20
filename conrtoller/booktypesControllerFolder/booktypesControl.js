const express = require('express');
const router = express.Router();
const service = require('../../services/booktypes/booktypeservice')

//Retrieve a list of all book types.
//http://localhost:3000/api/booktypes/getAllbooktypes

router.get('/getAllbooktypes',async(req,res)=>{
  const booktypes = await service.getAllbooktype()
  res.send(booktypes)
})

//Retrieve details of a specific book type by ID.
//http://localhost:3000/api/booktypes/getbooktypes/typeID

router.get('/getbooktypes/:typeID',async(req,res)=>{
    const booktypes = await service.getbooktypesById(req.params.typeID)
    if(booktypes.length == 0)
    res.status(404).json('no record id:'+req.params.id)
    res.send(booktypes)
   })

 // Add a new book type to the database.
//http://localhost:3000/api/booktypes/addbooktype/

router.post('/addbooktype',async(req,res)=>{
  if (!req.body.TypenName) {
    return res.status(502).send({ error: "TypenName Required" });
}
     await service.addbooktype(req.body)
    res.status(201).send('created successfully')
})


//Update details of a specific book type by ID.
//http://localhost:3000/api/booktypes/updatebooktype/typeID

router.put('/updatebooktype/:TypeID',async(req,res)=>{
    if (!req.body.TypeName) {
    return res.status(502).send({ error: "TypeName Required" });
}
   const affectedRows = await service.updatebooktype(req.body,req.params.TypeID)
   if(affectedRows == 0)
   res.status(404).json('no record id:'+req.params.id)
   else
   res.send('updated successful')

})

//Delete a book type from the database.
//http://localhost:3000/api/booktypes/deletebooktype/TypeID

router.delete('/deletebooktype/:TypeID',async(req,res)=>{
    const affectedRows = await service.deletebooktype(req.params.TypeID)
    if(affectedRows == 0)
    res.status(404).json('no record id:'+req.params.id)
    res.send('delete successful')
   })
module.exports = router;