require('dotenv').config();
const axios = require('axios');
const Alpaca = require('@alpacahq/alpaca-trade-api');
const asyncHandler = require('express-async-handler');



const alpaca = new Alpaca({
 keyId: process.env.USER_KEY,
 secretKey: process.env.SECRET,
 paper: true, 
});


const endDate = new Date();
// endDate.setMonth(endDate.getMonth() - 1);
endDate.setDate(endDate.getDate() - 1);

const startDate = new Date()
startDate.setDate(endDate.getDate() - 10);
// startDate.setMonth(endDate.getMonth() - 1);  


const start = startDate.toISOString().split('T')[0]
const end = endDate.toISOString().split('T')[0]

   
const marketPrice = asyncHandler (async(req, res) =>{
    const symbol = req.params.symbol;
    const trade = await alpaca.getLatestTrade(symbol);
    const OptionUrl = `https://data.alpaca.markets/v2/stocks/${symbol}/quotes?start=${start}&end=${end}&limit=10&feed=sip&sort=desc`;

    const options = {
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': process.env.USER_KEY,
        'APCA-API-SECRET-KEY': process.env.SECRET
      }
    };
    
    const quotes = await axios.get(OptionUrl, options) 
    const quote10 = [];
    if(quotes.data.quotes !== null){
        for(let i = 0; i < 10; i++){
            const quote = {
                Timestamp: quotes.data.quotes[i].t,
                Ask_Price: quotes.data.quotes[i].ap,
                Ask_Size: quotes.data.quotes[i].as,
                Ask_Exchange: quotes.data.quotes[i].ax,
                Bid_Price: quotes.data.quotes[i].bp,
                Bid_Size: quotes.data.quotes[i].bs,
                Bid_Exchange: quotes.data.quotes[i].bx,
            }
            quote10.push(quote);
        }
    }else{
        quote10.push("Data Not Available");
    }

    if(trade.Price === null){
        res.json({
            Trade_Price: "Data Not Available",
            Last_10_Quotes: quote10,
        });
    }else{
        res.json({
            Share_Price: {
                ID: trade.ID,
                Comapny_Name: symbol,
                Price: trade.Price,
                TimeStamp: trade.Timestamp.slice(0,10)
            },
            Last_10_Quotes:quote10,
        });
    }
})

module.exports = marketPrice;