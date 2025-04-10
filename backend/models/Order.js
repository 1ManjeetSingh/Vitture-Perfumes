import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
    pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
    house: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true, default: "India" }, 
    isDefault: { type: Boolean, default: false },
});

const OrderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Reference to the User who placed the order

    products: [
        {
            id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "ProductDetails", 
                required: true 
            },
            quantity: { type: Number, required: true, min: 1 },
        }
    ],

    razorpayOrderId: {
        type: String,
        required: true, // set to true if it's always expected
      },

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
        type: AddressSchema, 
        required: true 
    }, // Shipping address

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
