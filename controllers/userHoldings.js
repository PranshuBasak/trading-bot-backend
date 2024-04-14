require('dotenv').config();
const asyncHandler = require('express-async-handler');
const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
 keyId: process.env.USER_KEY,
 secretKey: process.env.SECRET,
 paper: true, 
});

const userholdings = asyncHandler( async(req, res) =>{
    const account = req.body;
    console.log(account)
    res.send("working")
})

module.exports = userholdings;  