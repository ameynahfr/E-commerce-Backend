import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    price : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    brand : {
        type : String,
        required : false
    },

    inventory : {
        type : Number,
        required : true
    },

    ratings : {
        type : String,
        required : false
    }


})

export const productModel = mongoose.model("productModel", productSchema)