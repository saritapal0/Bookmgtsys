const express = require('express');
const router = express.Router();
const service = require('../../services/clients/clients_services');
const ResponseManager = require('../../response/responseManager');




//Retrieve a list of all clients.
//http://localhost:3000/api/clients/getAllclients/

router.get('/getAllclients',async(req,res)=>{
  const clients = await service.getAllclients()
  ResponseManager.sendSuccess(res,clients)
})

//Retrieve details of a specific client by ID.
//http://localhost:3000/api/clients/getclient/client_id

router.get('/getclient/:client_id',async(req,res)=>{
    const clients = await service.getclientById(req.params.client_id)
    if(clients.length == 0)
  ResponseManager.statusError(404).json('no record id:'+req.params.client_id)
  ResponseManager.sendSuccess(res,clients)
   })

//Add a new client to the database.
//http://localhost:3000/api/clients/addclient/

router.post('/addclient',async(req,res)=>{
 
if (!req.body.client_name) {
    return ResponseManager.statusError(502).sendError({ error: "client_name Required" });
}
if (!req.body.email) {
    return ResponseManager.statusError(502).sendError({ error: "emai Required" });
}
if (!req.body.phone_number) {
   return ResponseManager.statusError(502).sendError({ error: "phone_number Required" });
}
if (!req.body.address) {
    return ResponseManager.statusError(502).sendError({ error: "address Required" });
}
if (!req.body.city) {
 return ResponseManager.statusError(502).sendError({ error: "city Required" });
}
   const affectedRows = await service.addclient(req.body)
   if(affectedRows == 0)
   ResponseManager.statusError(404).json('no record id:'+req.params.id)
   else
   ResponseManager.sendSuccess(res,'created successful')
})

//Update details of a specific client by ID.
//http://localhost:3000/api/clients/updateclient/client_id

router.put('/updateclient/:client_id',async(req,res)=>{
  
if (!req.body.client_name) {
    return ResponseManager.statusError(502).sendError({ error: "client_name Required" });
}
if (!req.body.email) {
    return ResponseManager.statusError(502).sendError({ error: "emai Required" });
}
if (!req.body.phone_number) {
   return ResponseManager.statusError(502).sendError({ error: "phone_number Required" });
}
if (!req.body.address) {
    return ResponseManager.statusError(502).sendError({ error: "address Required" });
}
if (!req.body.city) {
 return ResponseManager.statusError(502).sendError({ error: "city Required" });
}
   const affectedRows = await service.updateclient(req.body,req.params.client_id)
   if(affectedRows == 0)
   ResponseManager.statusError(404).json('no record id:'+req.params.id)
   else
   ResponseManager.sendSuccess(res,'updated successful')
})

//Delete a client from the database.
//http://localhost:3000/api/clients/deleteclient/client_id

router.delete('/deleteclient/:client_id',async(req,res)=>{
    const affectedRows = await service.deleteclient(req.params.client_id)
    if(affectedRows == 0)ResponseManager.statusError(404).json("no record id:" + req.params.id);
  ResponseManager.sendSuccess(res,"delete successful");

   })
module.exports = router;