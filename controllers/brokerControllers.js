require('dotenv').config();
const axios = require('axios');
const Alpaca = require('@alpacahq/alpaca-trade-api');
const asyncHandler = require('express-async-handler');
const eventQueryParamsSchema = require('../models/brokerSchema');

const WebSocket = require('ws');

const key = process.env.BROKER_KEY;
const secret = process.env.BROKER_SECRET_KEY;

const wsUrl = 'wss://paper-api.alpaca.markets/stream'; 

const ws = new WebSocket(wsUrl);



  

  const pricesUpdates = asyncHandler(async (req, res) => {
    ws.on('open', function open() {
        console.log('Connected to Alpaca WebSocket');
      
        // Authenticate upon connection
        ws.send(JSON.stringify({
          action: 'auth',
          key: key,
          secret: secret
        }));
      });
      
    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
      
        if (message.stream === 'trade_updates') {
          const tradeUpdateData = message.data;
          
          // Check the event type
          if (tradeUpdateData.event === 'fill') {
            console.log('Order filled:', tradeUpdateData);
            
            // Process the filled order data
            console.log(`Filled ${tradeUpdateData.qty} of ${tradeUpdateData.order.symbol} at ${tradeUpdateData.price} each.`);
          }
        }
      });

      ws.on('close', function close() {
        console.log('Connection closed');
      });
    
})



const alpaca = new Alpaca({
 keyId: process.env.USER_KEY,
 secretKey: process.env.SECRET,
 paper: true, 
});
  


const options = {
    headers: {
    accept: 'text/event-stream',
    authorization: `Basic ${process.env.WEB_AUTH}`
    },
      responseType: 'stream'
};
  
const brokerSSE = asyncHandler(async (req, res) => {
    const { error, value } = eventQueryParamsSchema.validate(req.body);

    const baseUrl = 'https://broker-api.sandbox.alpaca.markets/v1/events/accounts/status?';

    let OptionUrl = baseUrl;

    if(value.since !== null){
        OptionUrl = `${baseUrl}since=${value.since}&until=${value.until}&is=${value.id}}`;
    }
    if(value.since_id !== null){
        OptionUrl = `${baseUrl}since_id=${since_id}&until_id=${until_id}&is=${value.id}`;
    }
    if(value.since_ulid !== null){
        OptionUrl = `${baseUrl}since=${value.since_ulid}&until=${value.until_ulid}}&is=${value.id}`;
    }
    
    console.log(OptionUrl)

    try {
        const responseStream = await axios.get(OptionUrl, options);

        // Setting headers for SSE
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });

        // Forwarding the events from Alpaca to the connected client
        responseStream.data.on('data', (chunk) => {
            res.write(`data: ${chunk.toString()}\n\n`);
        });

        // Handling the end of the data stream from Alpaca
        responseStream.data.on('end', () => {
            res.end();
        });

    } catch (error) {
        console.error('Error connecting to Alpaca:', error);

        // Handling errors from the Alpaca API
        if (error.response) {
            const { status, data } = error.response;
            // Sending back the error status and message received from Alpaca
            res.status(status).json({ message: data.message });
        } else {
            // For non-HTTP errors (e.g., network issues), send a 500 status
            res.status(500).json({ message: 'Error connecting to Alpaca' });
        }
    }
});

module.exports = {
    brokerSSE,
}
