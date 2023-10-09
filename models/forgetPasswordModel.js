import mongoose from "mongoose";

const forgetPasswordSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true
    },

    otp : {
        type : String
    }
})

export const forgetPasswordModel = mongoose.model('forgetPasswordModel', forgetPasswordSchema)
