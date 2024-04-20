const express = require("express");
const app = express();
const db = require('./db');
const bodyparser = require("body-parser");
 require('express-async-errors')
bookRoutes = require('./conrtoller/booksControllerfolder/booksControl')
clientRoutes = require('./conrtoller/clientsControllerFolder/clientsControl')
booktypeRoutes = require('./conrtoller/booktypesControllerFolder/booktypesControl')
qualityRoutes = require('./conrtoller/qualityControllerFolder/qualityControl')
salesRoutes = require('./conrtoller/salesControllerFolder/salesControl')
purchaseRoutes = require ('./conrtoller/puchaseControllerFolder/purchaseControl')
cartsRoutes = require('./conrtoller/cartsControllerFolder/cartsControl')
orderhistoryRoutes = require('./conrtoller/orderhistoryControllerFolder/orderhistoryControl')

//middleware
app.use(bodyparser.json())
app.use('/api/books',bookRoutes)
app.use('/api/clients',clientRoutes)
app.use('/api/booktypes',booktypeRoutes)
app.use('/api/quality',qualityRoutes)
app.use('/api/sales',salesRoutes)
app.use('/api/purchase',purchaseRoutes)
app.use('/api/carts',cartsRoutes)
app.use('/api/orderhistory',orderhistoryRoutes)

//Global handler
app.use((err,res,req,next)=>{
   console.log(err)
   res.status[err.status || 500].send('something went wrong')
})

db.query("SELECT 1")
.then(()=>{
  console.log('connected')
  app.listen(3000,()=>console.log('Server started at 3000'));
})
 .catch(err=>console.log('connection failed \n' +err))

