import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel', 
      required: true,
    },

    items : [//User.find().skip((page-1)*pageSize).limit(pageSize)
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'productModel', 
          required: true,
        },

        quantity: {
          type: Number,
          default : 1
        },

        pricePerUnit: {
          type: Number
        },

        totalPrice: {
          type: Number
        }
      }
    ],

    totalCartPrice : {
      type: Number
    }
    
  });


  export const cartModel = mongoose.model('cartModel', cartSchema)
    