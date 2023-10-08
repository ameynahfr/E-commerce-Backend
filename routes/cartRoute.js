import express from 'express';
import { createCart, addItemToCart } from '../controllers/cartController.js';

const route = express.Router();

// Create a new cart for a user
route.post('/create-cart', createCart);

// Add an item to the user's cart
route.put('/add-item/:userId/:productId', addItemToCart);


export default route;
