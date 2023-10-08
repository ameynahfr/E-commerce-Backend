import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel', // Reference to the User model
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'productModel', // Reference to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true
    }
  });


  export const cartModel = mongoose.model('cartModel', cartSchema)
    