import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
    required: true,
  },

  image: {
    public_id: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "User",
  },
});

export const userModel = mongoose.model("userModel", userSchema);
