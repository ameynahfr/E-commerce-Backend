import { cartModel } from '../models/cartModel.js';

// Create a new cart for a user
export const createCart = async (req, res) => {
  try {
    const { user, product, quantity, price } = req.body;
    const cart = new cartModel(
        {
             user, 
             product,
             quantity,
             price

        }
    );

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Add an item to the user's cart
export const addItemToCart = async (req, res) => {
  try {
    const { user, product, quantity, price } = req.body;
    const cart = await cartModel.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the item is already in the cart; if yes, update the quantity
    const existingItem = cart.items.find((item) => item.product.toString() === product);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // If not, add a new item to the cart
      cart.items.push({ product: product, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Remove an item from the user's cart
export const removeItemFromCart = async (req, res) => {
  try {
    const { user, product } = req.params;
    const cart = await cartModel.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart by filtering out the item with a matching ID
    cart.items = cart.items.filter((item) => item._id.toString() !== product);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get the user's cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ user: userId }).populate('items.product', 'title price');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
