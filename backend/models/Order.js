import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Reference to the User who placed the order

    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "ProductDetails", 
                required: true 
            },
            quantity: { type: Number, required: true, min: 1 },
            priceAtPurchase: { type: Number, required: true } // Store price at the time of order
        }
    ],

    totalAmount: { type: Number, required: true },

    paymentStatus: { 
        type: String, 
        enum: ["Pending", "Completed", "Failed"], 
        default: "Pending" 
    }, 

    orderStatus: { 
        type: String, 
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"], 
        default: "Processing" 
    }, 

    address: { 
        type: String, 
        required: true 
    }, // Shipping address

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
