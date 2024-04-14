const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
 keyId: process.env.USER_KEY,
 secretKey: process.env.SECRET,
 paper: true, 
});



const userAccountDetails = asyncHandler(async (req, res) =>{
    const account = await alpaca.getAccount();
    // console.log(alpaca)
    res.send(account);
})

module.exports = userAccountDetails;