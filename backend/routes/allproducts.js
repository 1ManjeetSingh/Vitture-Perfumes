import express from 'express';
import ProductDetails from '../models/ProductDetails.js';

const router = express.Router();

// Route to get all product details
router.get('/products', async (req, res) => {
    try {
        const productDetails = await ProductDetails.find(); // Fetch all products

        res.status(200).json(productDetails);
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error' 
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await ProductDetails.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error retrieving product' });
    }
});


export default router;
