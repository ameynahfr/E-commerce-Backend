import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import forgetPasswordRoute from "./routes/forgetPasswordRoute.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, PUT,POST, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use("/api/role", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api", forgetPasswordRoute);

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB`);
});

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error(`Uncaught Exception: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${message.error}`);
  console.log(`Server is shutting down due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
