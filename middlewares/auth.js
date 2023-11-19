import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Please Login to access this resource" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decodedData.userId);

    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
