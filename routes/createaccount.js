const express = require('express');
const asyncHandler = require('express-async-handler')
const createAccount = require('../controllers/accountcontollers')
const router = express.Router();

router.post('/createaccount',createAccount)
module.exports = router;