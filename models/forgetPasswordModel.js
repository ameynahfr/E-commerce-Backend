import mongoose from "mongoose";

const forgetPasswordSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true
    },

    otp : {
        type : String
    },

    timestamp: {
        type: Date,
        default: Date.now, // Set the default value to the current timestamp
    }
})

export const forgetPasswordModel = mongoose.model('forgetPasswordModel', forgetPasswordSchema)
