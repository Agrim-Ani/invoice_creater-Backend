const mongoose = require('mongoose')
const asyncHandler =  require('express-async-handler')
const Account = require('../models/account');
const Invoice = require('../models/invoice');

const listInvoice = async(req,res)=>{
    const { Skip =0, Limit = 1, searchText = '' } = req.query;
    //making regular expresions of search text
    const searchexp = new RegExp(searchText, 'i');
    try {
        const invoices = await Invoice.find(
            {$or:[
                    { invoiceNumber: searchexp },
                    {'Account.name':searchexp },
                    { 'account.balances.balance': { $elemMatch: { $regex: searchexp } } }
        ]}
        )
        .populate('customerId', 'name')
        .skip(parseInt(Skip))
        .limit(parseInt(Limit))
        .lean();
        res.json({ invoices });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
}

module.exports = listInvoice;