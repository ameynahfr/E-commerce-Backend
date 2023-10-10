import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },

    cart : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cartModel',
      required: true
    },

    checkoutPrice: {
      type: Number
    },

    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postal_code: String,
      country: String,
    },

    paymentMethod: {
      type: String
    },

    orderStatus: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending',
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    isCancelled: {
      type: Boolean,
      default: false
    }
})


export const orderModel = mongoose.model('orderModel', orderSchema)