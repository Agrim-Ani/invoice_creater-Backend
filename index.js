const express = require('express');
const connectDb = require('./connectdb');
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000
//using middlewares
app.use(express.json())
connectDb();
app.get('/api',(req,res)=>{
    res.send("Welcome to invoice creator API!!!");
});
//setting routes
/*
ROUTE 1
TYPE POST
@DESC creating account
 */
const accountRoute = require("./routes/createaccount")
app.use('/api',accountRoute);
/*
ROUTE 2
TYPE POST
@DESC creating invoice
 */
const invoiceRoute = require("./routes/createinvoice")
app.use('/api',invoiceRoute);
/*
ROUTE 3
TYPE GET
@DESC list invoices
 */
const invoicelistRoute = require("./routes/invoicelist")
app.use('/api',invoicelistRoute);

app.use(errorHandler);
app.listen(port,()=>{console.log(`server is listening on port ${port}`)});