// models/review.js
import mongoose from 'mongoose';

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

const Review = mongoose.models.Review || mongoose.model("Reviews", reviewSchema);

export default Review;
