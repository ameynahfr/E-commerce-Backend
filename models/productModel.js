import express from "express";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [6, "Price cannot exceed 6 figures"],
  },

  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  inventory: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [4, "Inventory cannot exceed 9999"],
    default: 1,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const productModel = mongoose.model("productModel", productSchema);
