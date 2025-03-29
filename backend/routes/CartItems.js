import express from "express";
import mongoose from "mongoose";
import CartItems from "../models/CartItems.js";
import ProductDetails from "../models/ProductDetails.js";

const router = express.Router();

// Fetch all cart items with product details
router.get("/", async (req, res) => {
    try {
        const cartItems = await CartItems.find().populate({
            path: "productId",
            model: ProductDetails,
            select: "name price discount images"
        });

        const formattedCartItems = cartItems.map(item => ({
            id: item._id,
            itemName: item.productId.name,
            quantity: item.quantity,
            image: item.productId.images.length > 0 ? item.productId.images[0] : null, // First image
            price: item.productId.price,
            discount: item.productId.discount,
            savedForLater: item.savedForLater,
        }));

        res.status(200).json({ success: true, cartItems: formattedCartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch cart items", error: error.message });
    }
});


router.post('/addItem/:id', async (req, res) => {
    const { quantity } = req.body;
    const productId = req.params.id;

    try {
        const cartItem = await CartItems.findOne({productId});

        if(!cartItem){
        // If not, create a new cart item
        const newCartItem = new CartItems({ productId, quantity });
        await newCartItem.save();

        return res.status(200).json({message: "Item added to cart successfully", newCartItem});
        }
        else{
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({message: "Quantity added to cart successfully", cartItem});
        }
    } catch (error) {
        console.error('Error Adding Item to Cart:', error);
        res.status(500).json({ message: 'Failed to Add Item' });
    }
});

router.get("/decreaseQuantity/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItems.findById(id);

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            return res.status(200).json({ success: true, message: "Quantity decreased by 1", cartItem });
        } else {
            // If quantity is 1, remove item from cart
            // await CartItems.findByIdAndDelete(id);
            return res.status(200).json({ success: true, message: "Delete the Item from cart", cartItem });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to decrease quantity", error: error.message });
    }
});


router.get("/increaseQuantity/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItems.findById(id);

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        if (cartItem.quantity >= 1) {
            cartItem.quantity += 1;
            await cartItem.save();
            return res.status(200).json({ success: true, message: "Quantity decreased by 1", cartItem });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to decrease quantity", error: error.message });
    }
});

router.get("/deleteItem/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItems.findById(id);

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }
        else {
            // If quantity is 1, remove item from cart
            await CartItems.findByIdAndDelete(id);
            return res.status(200).json({ success: true, message: "Deleted the Item from cart", cartItem });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to decrease quantity", error: error.message });
    }
});



export default router;
