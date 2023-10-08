import express from 'express'
import { createOrder, cancelOrder, getAllOrders } from "../controllers/orderController.js";

const route = express.Router()

route.post('/create-order', createOrder)
route.delete('/cancel-order/:id', cancelOrder)
route.get('/all-orders', getAllOrders)

export default route