import { cartModel } from '../models/cartModel.js';
import { productModel } from '../models/productModel.js';

// Create a new cart for a user or update an existing one
export const addToCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const { productId, quantity } = items[0]

    // Check if the user already has a cart
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        items: [],
        totalCartPrice : 0
      });
    }

    // Find the product by productId
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product does not exist" });
    }

    // Check if the product is already in the cart
    const existingItemInCart = cart.items.find((item) => item.productId.toString() === productId.toString());

    if (existingItemInCart) {
      // Update quantity and total price
      existingItemInCart.quantity = quantity;
      existingItemInCart.totalPrice = existingItemInCart.quantity * product.price;

    } else {
      // Add the product to the cart
      cart.items.push({
        productId,
        quantity,
        pricePerUnit : product.price,
        totalPrice: quantity * product.price
      });
    }

    let totalCartPrice = 0;

    for (const item of cart.items) {
      totalCartPrice += item.totalPrice;
    }

    cart.totalCartPrice = totalCartPrice;

    await cart.save();
    return res.status(200).json({ message: "Item(s) added to cart successfully", cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await cartModel.find({ userId })
      .populate(
        {
          path: "items.productId",
          model: "productModel",
          select: "-__v -brand -inventory -category"
        }
      );

    if (!cart.length) { 
      return res.status(400).json({ message: "No cart exists for this user" });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
