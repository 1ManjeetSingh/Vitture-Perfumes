import express from "express";
import Razorpay from "razorpay";
import auth from "../middlewares/auth.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import ProductDetails from "../models/ProductDetails.js";
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
});

router.post("/create-order", auth, async (req, res) => {
    try {
      const { amount, address, orderItems } = req.body;
  
      if (!address || !orderItems || orderItems.length === 0) {
        return res.status(400).json({ success: false, message: "Address and order items are required" });
      }
  
      const options = {
        amount: amount * 100, // Razorpay needs amount in paise
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
      };
  
      const order = await razorpay.orders.create(options);
  
      const findUser = await User.findById(req.user._id);
  
      if (!findUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const storedOrder = await Order.create({
        userId: req.user._id,
        razorpayOrderId: order.id,
        address,
        products : orderItems,
        totalAmount: amount,
      });
  
      findUser.order.push(storedOrder._id);
      await findUser.save();
  
      return res.status(201).json({
        success: true,
        orderId: order.id,
        DB_OrderId : storedOrder._id,
        amount: order.amount,
        currency: order.currency
      });
  
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  });

router.put("/update-payment-status", auth, async (req, res) => {
    try {
        const { stat, orderId } = req.body
        
        const userFound = await User.findById(req.user._id);

        if (!userFound) return res.status(404).json({ success: false, message: "User not found" });

        const order = await Order.findById(orderId);

        if (!order) return res.status(404).json({ success: false, message: "order not found" });

        if(stat){
          order.paymentStatus = "Completed";
        } else{
          order.paymentStatus = "Failed";
        }

        await order.save();
        res.status(200).json({ success: true, message: "Payment Status : Completed", order });

    } catch (error) {
        res.status(500).json({ success: false, message: "paymentStatus : Failed", error: error.message });
    }
});

router.get("/user-orders", auth, async (req, res) => {
  try {
    const findUser = await User.findById(req.user._id);
    if (!findUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userOrders = await Order.find({ _id: { $in: findUser.order}, paymentStatus: "Completed" });

    return res.status(200).json({ success: true, message: 'Orders fetched', orders: userOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});
  
export default router;
