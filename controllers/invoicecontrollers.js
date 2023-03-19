const mongoose = require('mongoose');
const Invoice = require('../models/invoice');
const Account = require('../models/account');

const asyncHandler =  require('express-async-handler')


const createInvoice = asyncHandler(async (req,res)=>{
    const { 
        date, 
        customerId, 
        accountArray, 
        totalAmount, 
        invoiceNumber, 
        year } = req.body;
        //check if any empty fields
        if (!date || !customerId || !accountArray || accountArray.length === 0 || !totalAmount || !invoiceNumber || !year) {
            res.status(400)
            throw new Error('All fields are compulsory')
        }
        //use array.reduce function to accumulate the amount in account object
        let sum = 0;
        accountArray.forEach(element => {
             sum +=element.amount
        });
        if(sum != totalAmount){
            res.status(400)
            throw new Error('Account array amount sum must be equal to totalAmount')
        }
        //take all ids from accountArray and put them in another array for checking
        // const acc_id = accountArray.map((account) => { account.accountId});
        let acc_id = []
        accountArray.forEach(element => {
             acc_id.push(element.accountId)
        });
        const accounts = await Account.find({_id:{$in: acc_id}});
        if(accounts.length !== acc_id.length){
            console.log(acc_id[0])
            console.log(accounts.length,acc_id.length)
            res.status(404)
            throw new Error('one or more account id not found in database')
        }
        //check using findone() if the invoice with same invoice number and year exists already 
        const check_inv = await Invoice.findOne({invoiceNumber,year});
        if(check_inv){
            res.status(400)
            throw new Error('invoice with same invoice number and year already exists')
        }
        //post invoice to db
        else if(!check_inv){
            const invoice = await Invoice.create({
                date, 
                customerId, 
                accountArray, 
                totalAmount, 
                invoiceNumber, 
                year
            });
            res.status(201).json(invoice);
            await Promise.all(accountArray.map(async (acc) => {
                const account = await Account.findById(acc.accountId);
                const balance = account.balances.find(b => b.year === year);
                balance.balance += acc.amount;
                await account.save();
            }));
        }
        
});
module.exports = createInvoice;