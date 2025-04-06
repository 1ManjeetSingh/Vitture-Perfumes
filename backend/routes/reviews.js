// routes/reviewRoutes.js
import express from 'express';
import Review from '../models/AllReview.js';
import mongoose from 'mongoose';
import auth from '../middlewares/auth.js';
import User from "../models/User.js";

const router = express.Router();

// POST: Create a new review
router.post('/', auth, async (req, res) => {
    const { productId, rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({ message: 'All fields are required' });
      }

    try {
        const userFound = await User.findById(req.user._id);
        const newReview = new Review({ productId, userName: userFound.fullName, rating, comment });
        await newReview.save();

        userFound.reviews.push(newReview._id);
        userFound.save();

        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Failed to create review' });
    }
});

router.get('/:productId', async (req, res) => {
    const productId = new mongoose.Types.ObjectId(req.params.productId);

    try {
        const reviews = await Review.find({ productId: productId });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
});

export default router;
