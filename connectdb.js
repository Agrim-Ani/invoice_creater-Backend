const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
mongoose.set('strictQuery', true)
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log("DATABASE is CONNECTED")
    } catch (error) {
        console.log(error)
    }
};

module.exports = connectDb; 