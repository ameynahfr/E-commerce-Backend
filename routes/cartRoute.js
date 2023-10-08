import express from 'express';
import { createCart, addItemToCart, removeItemFromCart, getCart } from '../controllers/cartController.js';

const route = express.Router();

// Create a new cart for a user
route.post('/create-cart', createCart);

// Add an item to the user's cart
route.post('/add-item', addItemToCart);

// Remove an item from the user's cart
route.delete('/remove-item/:userId/:itemId', removeItemFromCart);

// Get the user's cart
route.get('/get-cart/:userId', getCart);

export default route;
