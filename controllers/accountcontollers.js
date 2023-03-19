const mongoose = require('mongoose')
const asyncHandler =  require('express-async-handler')
const Account = require('../models/account');


const createAccount = asyncHandler(async(req,res)=>{
    console.log("The request body is:", req.body);
    const {name , balances} = req.body;
    if(!name||balances.length===0){
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const account = await Account.create({
        name,
        balances
    });
    res.status(201).json(account);
});

module.exports = createAccount;