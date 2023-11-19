import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
//Register new User

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      image,
      role,
    } = req.body;

    if (!firstName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please provide required information" });
    }
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await userModel.findOne({ email });

    //check if user already exsits
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already associated with another user",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      image,
      role,
    });

    await user.save();
    res.status(200).json({ message: "User registered Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email id
    let user = await userModel.findOne({ email }).select("+password");

    // check if user exists
    if (!user) {
      throw new Error("Email or Password incorrect");
    }

    // compare passwords
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json("Invalid Email and/or Password");
    }

    // create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token in the response cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("token", token, options);

    // Respond with success and user data
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

//Get all user's data  --- ADMIN

export const getAllUsersData = async (req, res) => {
  try {
    const user = await userModel.find();
    if (!user) {
      return res.status(400).send("No users found");
    }
    return res.status(201).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//Get single user ---ADMIN
export const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the provided current password matches the user's old password
    const id = req.user.id;
    const user = await userModel.findById(id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect Old Password" });
    }

    // Update the user's password with the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//See user details

export const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//Update a user

export const updateUser = async (req, res) => {
  try {
    let user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user = await userModel.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    return res.status(200).json({ message: "User successfully updated", user });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//Delete a user

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await userModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Logout user

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
