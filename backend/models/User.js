import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Cart Item Schema
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductDetails',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    savedForLater: {
        type: Boolean,
        required: true,
        default: false,
    }
});

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

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductDetails',
        required: true,
    },
    userName: {
        type: String,
        default: 'User',
    },
    rating: {
        type: Number,
        required: true,
         min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true, 
        trim: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true 
    },

    phoneNo: {
        type: Number,
        required: false,
    },

    address: [AddressSchema],

    cartItems: [CartItemSchema],

    order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

    reviews: [reviewSchema],

    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
