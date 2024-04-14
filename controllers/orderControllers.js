
const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const Alpaca = require('@alpacahq/alpaca-trade-api');
const axios = require('axios');
const {orderSchema, reorderSchema} = require('../models/orderSchema');

const alpaca = new Alpaca({
 keyId: process.env.USER_KEY,
 secretKey: process.env.SECRET,
 paper: true, 
});

const OptionUrl = `https://paper-api.alpaca.markets/v2/orders`;

const options = {
  headers: {
    accept: 'application/json',
    'APCA-API-KEY-ID': process.env.USER_KEY,
    'APCA-API-SECRET-KEY': process.env.SECRET
  }
};

const getAllOrders = asyncHandler (async(req, res) =>{
    const orders = await axios.get(OptionUrl, options) 
    if (orders.data !== null) {
        const orderList = orders.data.map((data) => {
            return {
                ID: data.id,
                Client_order_ID: data.client_order_id,
                Created_At: data.created_at.slice(0,10),
                Updated_At: data.updated_at.slice(0,10),
                Submitted_at: data.submitted_at.slice(0,10).slice(0,10),
                Expired_at: data.expired_at,
                Canceled_at: data.canceled_at,
                Asset_id: data.asset_id,
                Symbol: data.symbol,
                Asset_class: data.asset_class,
                Quantity: data.qty,
                Filled_Qty: data.filled_qty,
                Filled_Avg_Price: data.filled_avg_price,
                Order_Class: data.order_class,
                Order_Type: data.order_type,
                Side: data.side,
                Time_In_Force: data.time_in_force,
                Limit_Price: data.limit_price,
                Stop_Price: data.stop_price,
                Status: data.status,
                Extended_Hours: data.extended_hours,
                Trail_Percent: data.trail_percent,
                Trail_Price: data.trail_price,
            };
        });
        res.status(201).send(orderList);
    }else{
        res.status(404).json({
            message: "No Order Found",
        });
    }

    
})

const getAllOrdersId = asyncHandler (async(req, res) =>{
    const orders = await axios.get(OptionUrl, options) 
    if (orders.data !== null) {
        const orderList = orders.data.map((data) => {
            return {
                ID: data.id,
                Replaced_BY: data.replaced_by,
                Replaces: data.replaces,
            };
        });
        res.status(201).send(orderList);
    }else{
        res.status(404).json({
            message: "No Order Found",
        });
    }

    
})


const placeSingleOrder = asyncHandler(async (req, res) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const placedOrder = await axios.post(OptionUrl, value, options);
      res.status(201).json(placedOrder.data);
    }
    console.log(value)

  } catch (error) {
    if (error.response.status === 422) {
       
      res.status(422).json(error.response.data.message);
    } else if (error.response.status === 403) {
        res.status(403).json(error.response.data.message);
    }else{
        res.status(400).json(error.response.data.message);
    }
  }
})

const getSingleOrder = asyncHandler(async (req, res) => {try{

        const {id} = req.params;
        const orderUrl = `${OptionUrl}/${id}`
        const order = await axios.get(orderUrl, options)
        res.send(order.data)
    }catch(error){
        res.status(error.response.status).json(error.response.data.message)
    }})

const patchSingleOrder = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const reorderUrl = `${OptionUrl}/${id}`
        
        const { error, value } = reorderSchema.validate(req.body);
        
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            replacedOrder = await axios.patch(reorderUrl, value, options);
            res.status(201).json(replacedOrder.data);
        }

    } catch (error) {
        if (error.response.status === 422) {
           
          res.status(422).json(error.response.data.message);
        } else if (error.response.status === 403) {
            res.status(403).json(error.response.data.message);
        }else{
            res.status(400).json(error.response.data.message);
        }
    }
    
})

const deleteAllOrders = asyncHandler(async (req, res) => {
    const deleteAll = await axios.delete(OptionUrl, options)
        
    res.send(deleteAll.data)
})


const deleteSingleOrders = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const deleteUrl = `${OptionUrl}/${id}`
    const deleteOrder = await axios.delete(deleteUrl, options)

    res.send("Order Deleted "+id)
})

module.exports = {
    getAllOrders,
    placeSingleOrder,
    getSingleOrder,
    getAllOrdersId,
    patchSingleOrder,
    deleteAllOrders,
    deleteSingleOrders,
};

