import express from 'express';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const mongoURL = process.env.DB_URI;
const dbName = 'Olacademy';
let client;
let bucket;

(async function connectToMongoDB() {
    try {
        client = new MongoClient(mongoURL);
        await client.connect();
        const db = client.db(dbName);
        bucket = new GridFSBucket(db);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
})();

// Route to get image by ObjectId
router.get('/files/:id', async (req, res) => {
    try {
        const fileId = new ObjectId(req.params.id);
        const fileStream = bucket.openDownloadStream(fileId);

        // Handle errors in streaming
        fileStream.on('error', (error) => {
            console.error('Error retrieving image:', error.message);
            res.status(404).json({ message: 'Image not found' });
        });

        // Set headers and pipe image to response
        res.setHeader('Content-Type', 'image/jpeg');  // Adjust as necessary
        fileStream.pipe(res);

    } catch (error) {
        console.error('Error retrieving image by ObjectId:', error.message);
        if (error.name === 'BSONTypeError') {
            res.status(400).json({ message: 'Invalid ObjectId format' });
        } else {
            res.status(500).json({ message: 'Server error retrieving image' });
        }
    }
});

export default router;
