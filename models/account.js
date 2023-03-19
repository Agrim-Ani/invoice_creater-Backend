const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter the name of account holder"]
    },
    balances: [
        {
            year: { 
                type: String, 
                required: true 
            },
            balance: { 
                type: Number, 
                required: true 
            }
        }
    ]
})

module.exports = mongoose.model('Account', accountSchema);