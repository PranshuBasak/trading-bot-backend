const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const marketRoute = require('./routes/marketRoutes');
const orderRoute = require('./routes/orderRoutes');
const brokerRoute = require
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());


// Middleware to allow cross-origin requests (useful for frontend clients to connect to SSE)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//Route Middleware
app.use('/api/v1', marketRoute)
app.use('/api/v1/order', orderRoute)
app.use('/api/v1/events', brokerRoute)


// Routes
app.get("/", (req, res) => {
  res.send("Home Page & Server Running..");
});


const port = process.env.PORT || 3000

//Start Server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
