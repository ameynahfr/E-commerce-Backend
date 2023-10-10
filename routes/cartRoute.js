import express from 'express'
import { addToCart, getCart } from '../controllers/cartController.js'

const route = express.Router()

route.post('/create-cart', addToCart)
route.get('/get-cart/:userId', getCart)


export default route;

