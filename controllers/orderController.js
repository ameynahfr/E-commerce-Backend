import { orderModel } from "../models/orderModel.js";


//Create order
export const createOrder = async (req, res) => {
    try {

        const { user, items, price, status, shippingAddress, paymentInfo, createdAt } = req.body
        const order = new orderModel({
            user, 
            items, 
            price, 
            status, 
            shippingAddress,
            createdAt
        })
        await order.save()
        res.status(200).json({message: "Order created successfully"})

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getAllOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find()
        if(!orders){
            res.status(400).json({message: "No orders created yet"})
        }
        res.status(200).json(orders)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


//Cancel order
export const cancelOrder = async (req, res) => {
    try {
      const orderId = req.params.id; // Assuming 'id' is the field in req.body that contains the order ID
  
      // Use await to execute the query and retrieve the order document
      const order = await orderModel.findById(orderId);
  
      if (!order) {
        return res.status(400).json({ message: "Order doesn't exist" });
      }
  
      // Use await to delete the order document
      await orderModel.findByIdAndDelete(orderId);
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
  


