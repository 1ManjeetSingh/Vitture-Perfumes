import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],

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
