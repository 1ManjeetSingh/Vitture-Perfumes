import express from 'express';
import connectDB from './config/db.js';
import allproductsRoute from './routes/allproducts.js';
import uploadRoutes from './routes/upload.js';
import productImagesRoute from './routes/productImages.js';
import reviewsRoute from './routes/reviews.js';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';

app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    methods: "GET,POST",
    credentials: true
}));

app.use(morgan('dev'));

// Database connection with error handling
connectDB()
    .then(() => {
        app.use('/api/allproducts', allproductsRoute);
        app.use('/api/upload', uploadRoutes);
        app.use('/api/productImages', productImagesRoute);
        app.use('/api/reviews', reviewsRoute);

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
        process.exit(1);
    });
