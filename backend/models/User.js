import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Address from "./Address";

const UserSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },

    fullName: { 
        type: String, 
        required: true, 
        trim: true 
    },

    email: { 
        type: String, 
        required: false, 
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

// Hash password before saving the user
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
