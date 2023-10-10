import express from 'express'
import { addToCart, deleteItem, getCart } from '../controllers/cartController.js'

const route = express.Router()

route.post('/create-cart', addToCart)
route.get('/get-cart/:userId', getCart)
route.delete('/delete-item/:cartId/:productId', deleteItem)

export default route;

