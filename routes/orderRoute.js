import express from 'express'
import { createOrder, cancelOrder, getAllOrders, getSingleOrder, getAllOrdersBySingleUser } from "../controllers/orderController.js";

const route = express.Router()

route.post('/create-order/:userId/:cartId', createOrder)

route.get('/all-orders/:userId', getAllOrdersBySingleUser)
route.get('/single-order/:orderId', getSingleOrder)
route.get('/all-orders', getAllOrders)

route.delete('/cancel-order/:orderId', cancelOrder)

export default route