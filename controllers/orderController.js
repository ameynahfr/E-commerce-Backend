import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js"
import { cartModel } from "../models/cartModel.js"


//Create order
export const createOrder = async (req, res) => {
    try {
        const { userId, cartId } = req.params;
        const { shippingAddress, paymentMethod } = req.body;
        
        // Find the user and cart by _id
        const findUser = await userModel.findOne({ _id: userId });
        const findCart = await cartModel.findOne({ _id: cartId });

        if (!findUser || !findCart) {
            return res.status(404).json({ message: 'User or cart not found' });
        }

        let checkoutPrice = findCart.totalCartPrice;
        
        const order = new orderModel({
            user: findUser._id,
            cart: findCart._id,
            checkoutPrice,
            shippingAddress,
            paymentMethod,
        });

        await order.save();
        res.status(200).json({ message: 'Order created successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Checkout
export const checkOut = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// Get all orders by a single user
export const getAllOrdersBySingleUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await orderModel.find({ user: userId })
            .populate({
                path: "user",
                model: "userModel"
            })
            .populate({
                path: "cart",
                model: "cartModel"
            });

        if (!orders || orders.length === 0) {
            return res.status(400).json({ message: "No orders created yet" });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get single user order

export const getSingleOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Find the order by its ID
      const order = await orderModel.findById(orderId)
        .populate({
          path: 'user',
          model: 'userModel'
        })
        .populate({
          path: 'cart',
          model: 'cartModel'
        });
  
      // Check if the order exists
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Return the order as a JSON response
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get all orders by all users (Admin)
export const getAllOrders = async (req, res) => {
    try {
      // converting query parameters to numbers
      const page = parseInt(req.query.page);
      const pageSize = parseInt(req.query.pageSize);
  
      // Check if the extracted values are valid numbers
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).json({ message: "Invalid page or pageSize parameter" });
      }
  
      // Calculating skip and limit values for pagination
      const skip = (page - 1) * pageSize;
  
      const orders = await orderModel.find()
        .skip(skip)
        .limit(pageSize)
        .populate({
          path: "user",
          model: "userModel"
        })
        .populate({
          path: "cart",
          model: "cartModel"
        });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

//Cancel order
export const cancelOrder = async (req, res) => {
    try {
      const { orderId } = req.params // Assuming 'id' is the field in req.body that contains the order ID
  
      // Use await to execute the query and retrieve the order document
      const order = await orderModel.findById(orderId);
     
  
      if (!order) {
        return res.status(400).json({ message: "Order doesn't exist" });
      }
  
      // Use await to delete the order document
      await orderModel.findByIdAndDelete(orderId);
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


