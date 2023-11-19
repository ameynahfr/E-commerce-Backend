import express from "express";
import {
  getAllProductsData,
  registerProduct,
  searchProductById,
  updateProduct,
  deleteProduct,
  reviewProduct,
  getProductReviews,
  deleteReview,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const route = express.Router();

route.post(
  "/register-product",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  registerProduct
);
route.get("/all-products", getAllProductsData);
route.get("/search-product/:id", searchProductById);
route.put(
  "/update-product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
route.delete(
  "/delete-product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

route.put("/review-product", isAuthenticatedUser, reviewProduct);
route.get("/product-reviews", getProductReviews);
route.delete(
  "/delete-review",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteReview
);
export default route;
