import mongoose from "mongoose";
import { productModel } from "../models/productModel.js";

const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel', // Reference to the User model
        required: true,
    },

    items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productModel', // Reference to the Product model
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],

      price: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
      },

      shippingAddress: {
        street: String,
        city: String,
        state: String,
        postal_code: String,
        country: String,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
})


export const orderModel = mongoose.model('orderModel', orderSchema)