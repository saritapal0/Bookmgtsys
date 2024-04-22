const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const service = require('../../services/clients/clients_services');
const ResponseManager = require('../../response/responseManager');



//jwt tokens authentication
function varifyToken(req, res, next) {
   const token = req.headers["authorization"];
   console.log("middleware", token);
   if (token) {
     let token = token.split("")[1];
     jwt.verify(token, jwt, (err, valid) => {
       if (err) {
         res.status(401).send({ result: "plz provide valid token" });
       } else {
         next();
       }
     });
   } else {
     res.status(403).send({ result: "plz add token with header" });
   }
 }
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

router.post('/addclient',varifyToken,async(req,res)=>{
 
if (!req.body.client_name) {
    return res.status(502).send({ error: "client_name Required" });
}

if (!req.body.email) {
    return res.status(502).send({ error: "emai Required" });
}
if (!req.body.phone_number) {
   return res.status(502).send({ error: "phone_number Required" });
}
if (!req.body.address) {
    return res.status(502).send({ error: "address Required" });
}
if (!req.body.city) {
 return res.status(502).send({ error: "city Required" });
}
     await service.addclient(req.body)
    res.status(201).send('created successfully')
})

//Update details of a specific client by ID.
//http://localhost:3000/api/clients/updateclient/client_id

router.put('/updateclient/:client_id',async(req,res)=>{
   if (!req.body.client_id ) {
    return res.status(502).send({ error: "client_id  Required" });
}
if (!req.body.client_name) {
    return res.status(502).send({ error: "client_name Required" });
}

if (!req.body.email) {
    return res.status(502).send({ error: "emai Required" });
}
if (!req.body.phone_number) {
   return res.status(502).send({ error: "phone_number Required" });
}
if (!req.body.address) {
    return res.status(502).send({ error: "address Required" });
}
if (!req.body.city) {
 return res.status(502).send({ error: "city Required" });
}
   const affectedRows = await service.updateclient(req.body,req.params.client_id)
   if(affectedRows == 0)
   res.status(404).json('no record id:'+req.params.id)
   else
   res.send('updated successful')

})

//Delete a client from the database.
//http://localhost:3000/api/clients/deleteclient/client_id

router.delete('/deleteclient/:client_id',async(req,res)=>{
    const affectedRows = await service.deleteclient(req.params.client_id)
    if(affectedRows == 0)
    res.status(404).json('no record id:'+req.params.id)
    res.send('delete successful')
   })
module.exports = router;