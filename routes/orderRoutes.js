const express = require("express");
const { getAllOrders, placeSingleOrder, getSingleOrder, getAllOrdersId, patchSingleOrder, deleteAllOrders, deleteSingleOrders } = require("../controllers/orderControllers");

const router = express.Router();

//Get all Order Info
router.get('/all', getAllOrders);
//Get Only Order ID of All Orders
router.get('/all/id', getAllOrdersId);
//Create A new Order
router.post('/placeorder', placeSingleOrder);
//Get Single Order Info
router.get('/:id' , getSingleOrder)
//Replace an existing order that is not filled
router.patch('/patch/:id' , patchSingleOrder)
//Delete All an existing order that are not filled
router.delete('/all' , deleteAllOrders)
//Delete Single  order that is not filled
router.delete('/all/:id' , deleteSingleOrders)

module.exports = router;