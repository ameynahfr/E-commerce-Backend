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
      const { userId, productId } = req.params;
      const { quantity } = req.body;
  
      if (quantity === 0) {
        // If the quantity is set to 0, remove the product from the cart
        await cartModel.deleteOne({ user: userId, product: productId });
        return res.status(200).json({ message: 'Product removed from the cart' });
      } else {
        let cart = await cartModel.findOne({ user: userId, product: productId });
  
        if (!cart) {
          // If the cart doesn't exist, create a new one
          cart = new cartModel({
            user: userId,
            product: productId,
            quantity,
            price: 0,
          });
        } else {
          // If the cart exists, update the quantity
          cart.quantity = quantity;
        }

        await cart.save();
  
        return res.status(200).json({ message: 'Cart updated successfully' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  }