const express = require("express");
const app = express();
const db = require('./db');
const cors = require('cors')
require('express-async-errors')
const ResponseManager = require('./response/responseManager')
bookRoutes = require('./conrtoller/booksControllerfolder/booksControl')
clientRoutes = require('./conrtoller/clientsControllerFolder/clientsControl')
booktypeRoutes = require('./conrtoller/booktypesControllerFolder/booktypesControl')
qualityRoutes = require('./conrtoller/qualityControllerFolder/qualityControl')
salesRoutes = require('./conrtoller/salesControllerFolder/salesControl')
purchaseRoutes = require ('./conrtoller/puchaseControllerFolder/purchaseControl')
orderhistoryRoutes = require('./conrtoller/orderhistoryControllerFolder/orderhistoryControl')
loginRoutes = require('./Auth/login');
uploadfileRouter= require('./conrtoller/cartsControllerFolder/cartsControl')

//middleware
app.use(express.json())
app.use(cors())
app.use('/api/books',bookRoutes)
app.use('/api/clients',clientRoutes)
app.use('/api/booktypes',booktypeRoutes)
app.use('/api/quality',qualityRoutes)
app.use('/api/sales',salesRoutes)
app.use('/api/purchase',purchaseRoutes)
app.use('/api/orderhistory',orderhistoryRoutes)
app.use('/login',loginRoutes);
app.use('/uploadfile',uploadfileRouter)


//Global handler
app.all("*", (req, res) => {
  ResponseManager.sendError(res, 404, "", "Yes", "Page Not Found");
});
 app.use((err,res,req,next)=>{
  res.status(500).json({
    msg:err.msg,
})
next(err)
 }
)
app.listen(3000,()=>{
  console.log('server running on 3000');
})

