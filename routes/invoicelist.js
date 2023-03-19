const express = require('express');
const listInvoice = require('../controllers/listcontrollers')
const router = express.Router();

router.get('/invoicelist',listInvoice)

module.exports = router;