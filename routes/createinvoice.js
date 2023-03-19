const express = require('express');
const createInvoice = require('../controllers/invoicecontrollers')
const router = express.Router();


router.post('/createinvoice',createInvoice)
module.exports = router;