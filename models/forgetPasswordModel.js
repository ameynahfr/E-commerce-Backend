import mongoose from "mongoose";

const forgetPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the timestamp when OTP changes
forgetPasswordSchema.pre("save", function (next) {
  if (this.isModified("otp")) {
    this.timestamp = new Date();
  }
  next();
});

export const forgetPasswordModel = mongoose.model(
  "forgetPasswordModel",
  forgetPasswordSchema
);
