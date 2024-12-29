import express from 'express';
import multer from 'multer';
import { MongoClient, GridFSBucket } from 'mongodb';
import ProductDetails from '../models/ProductDetails.js'; // Make sure your model can accept images array
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// MongoDB connection URL and database name
const mongoURL = process.env.DB_URI; 
const dbName = 'Olacademy'; 

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload product
router.post('/upload-product', upload.array('images', 5), async (req, res) => {
    const client = new MongoClient(mongoURL);
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new GridFSBucket(db);

        const { name, flavour, price, discount, description } = req.body;

        // Create an array to hold the IDs of the uploaded images
        const imageIds = [];

        // Loop through the uploaded files
        for (const file of req.files) {
            const readableStream = new Readable();
            readableStream.push(file.buffer);
            readableStream.push(null);

            // Create an upload stream and pipe the image buffer into GridFS
            const uploadStream = bucket.openUploadStream(file.originalname, { contentType: file.mimetype });
            readableStream.pipe(uploadStream);

            // Wait for the upload to finish
            const id = await new Promise((resolve, reject) => {
                uploadStream.on('finish', () => resolve(uploadStream.id));
                uploadStream.on('error', reject);
            });

            // Store the ID of the uploaded image
            imageIds.push(id);
        }

        // Process and save form data and images to the database
        const product = new ProductDetails({
            name,
            flavour,
            price,
            discount,
            description,
            images: imageIds, // Store the IDs of images in your product schema
        });

        await product.save();

        res.status(200).json({ message: 'Product uploaded successfully', product });
    } catch (error) {
        console.error('Error uploading product:', error);
        res.status(500).json({ message: 'An error occurred during the upload' });
    } finally {
        await client.close(); // Ensure that the client is closed after the operation
    }
});

export default router;
