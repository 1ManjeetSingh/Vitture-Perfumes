import express from "express";
import Razorpay from "razorpay";
import auth from "../middlewares/auth.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
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
        items: orderItems,
        amount,
        status: "pending",
      });
  
      findUser.order.push(storedOrder._id);
      await findUser.save(); // Make sure to await this
  
      return res.status(201).json({
        success: true,
        orderId: order.id,
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

export default router;
