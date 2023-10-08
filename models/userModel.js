import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : false
    },

    username : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    phone : {
        type : Number,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : false
    },

    isAdmin : {
        type : Boolean,
        required : true
    }


})

export const userModel = mongoose.model("userModel", userSchema)