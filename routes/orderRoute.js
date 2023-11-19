// orderRoutes.js

import express from "express";
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const route = express.Router();

route.post("/new", isAuthenticatedUser, newOrder);
route.get("/single-order/:id", isAuthenticatedUser, getSingleOrder);
route.get("/my-orders", isAuthenticatedUser, myOrders);
route.get(
  "/admin/all-orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrders
);
route.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
);
route.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);

export default route;
