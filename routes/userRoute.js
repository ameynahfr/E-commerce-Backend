import express from "express";

import {
  getAllUsersData,
  registerUser,
  updateUser,
  deleteUser,
  login,
  changePassword,
  logout,
  getUserDetails,
  getSingleUser,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { tokenVerify } from "../middlewares/tokenVerify.js";

const route = express.Router();
//Register
route.post("/user/register-user", registerUser);
//Login
route.post("/user/login", login);
//Update Password
route.put("/user/update-password", isAuthenticatedUser, changePassword);
//Update user data
route.put("/user/update-user", isAuthenticatedUser, updateUser);
//Get all users ---Admin
route.get(
  "/admin/all-users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsersData
);
//Get single user data ---Admin
route.get(
  "/admin/single-user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);
//Update user data
route.get("/user/me", isAuthenticatedUser, getUserDetails);
//Delete user data ---Admin
route.delete(
  "/admin/delete-user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);
//Logout
route.get("/user/logout", logout);

export default route;
