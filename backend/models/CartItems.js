import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductDetails',
            required: true,
        },
    quantity: {
        type: Number,
        required : true,
    },
    savedForLater: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const CartItems = mongoose.models.CartItems || mongoose.model("CartItems", CartItemSchema);

export default CartItems;
