import express from "express";
import mongoose from "mongoose";
import ProductDetails from "../models/ProductDetails.js";
import auth from '../middlewares/auth.js';
import User from "../models/User.js";
const router = express.Router();

// Fetch all cart items with product details
router.get("/", auth, async (req, res) => {
    try {
        const userFound = await User.findById(req.user._id).populate({
            path: "cartItems.productId",
            model: "ProductDetails",
            select: "name price discount images"
        });

        if (!userFound) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const formattedCartItems = userFound.cartItems.map(item => ({
            id: item._id,
            itemName: item.productId?.name,
            quantity: item.quantity,
            image: item.productId?.images?.[0] ?? null,
            price: item.productId?.price,
            discount: item.productId?.discount,
            isChecked: item.isChecked,
            savedForLater: item.savedForLater,
        }));

        res.status(200).json({ success: true, cartItems: formattedCartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch cart items", error: error.message });
    }
});


router.post('/addItem/:id', auth, async (req, res) => {
    const { quantity } = req.body;
    const productId = req.params.id;
    try {
        const userFound = await User.findById(req.user._id);

        if (!userFound) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const existingCartItem = userFound.cartItems.find(item => item.productId.toString() === productId);

        if (!existingCartItem) {
            userFound.cartItems.push({ productId, quantity,  });
        } else {
            existingCartItem.quantity += quantity;
        }

        await userFound.save();

        return res.status(200).json({
            message: existingCartItem ? "Quantity updated in cart" : "Item added to cart successfully",
            cartItems: userFound.cartItems,
            success: true
        });

    } catch (error) {
        console.error('Error Adding Item to Cart:', error);
        res.status(500).json({ message: 'Failed to Add Item', success: false });
    }
});

router.put("/decreaseQuantity/:id", auth, async (req, res) => {
    const productId = req.params.id;

    try {
        const userFound = await User.findById(req.user._id);

        if (!userFound) return res.status(404).json({ success: false, message: "User not found" });

        const cartItem = userFound.cartItems.find(item => item.id.toString() === productId);

        if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await userFound.save();
            return res.status(200).json({ success: true, message: "Quantity decreased by 1", cartItem });
        } else {
            // Optional: remove the item
            return res.status(200).json({ success: true, message: "Quantity is 1. You can remove the item", cartItem });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to decrease quantity", error: error.message });
    }
});

router.put("/increaseQuantity/:id", auth, async (req, res) => {
    const productId = req.params.id;

    try {
        const userFound = await User.findById(req.user._id);

        if (!userFound) return res.status(404).json({ success: false, message: "User not found" });

        const cartItem = userFound.cartItems.find(item => item.id.toString() === productId);

        if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });

        cartItem.quantity += 1;
        await userFound.save();
        res.status(200).json({ success: true, message: "Quantity increased by 1", cartItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to increase quantity", error: error.message });
    }
});

router.put("/unCheck", auth, async (req, res) => {
    try {
        const { productId } = req.body
        
        const userFound = await User.findById(req.user._id);

        if (!userFound) return res.status(404).json({ success: false, message: "User not found" });

        const cartItem = userFound.cartItems.find(item => item._id.toString() === productId);

        if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });

        cartItem.isChecked = !cartItem.isChecked;

        await userFound.save();
        res.status(200).json({ success: true, message: "successful", cartItem });

    } catch (error) {
        res.status(500).json({ success: false, message: "Please try again", error: error.message });
    }
});

router.delete("/deleteItem/:id", auth, async (req, res) => {
    const productId = req.params.id;

    try {
        const userFound = await User.findById(req.user._id);

        if (!userFound) return res.status(404).json({ success: false, message: "User not found" });

        const cartItem = userFound.cartItems.find(item => item.id.toString() === productId);

        const cartItemId = cartItem._id.toString();

        if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });

        userFound.cartItems = userFound.cartItems.filter(item => item._id.toString() !== cartItemId);
        await userFound.save();

        res.status(200).json({ success: true, message: "Item deleted from cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete item", error: error.message });
    }
});

export default router;
