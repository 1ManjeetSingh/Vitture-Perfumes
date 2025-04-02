import express from 'express';
import connectDB from './config/db.js';
import allproductsRoute from './routes/allproducts.js';
import uploadRoutes from './routes/upload.js';
import productImagesRoute from './routes/productImages.js';
import reviewsRoute from './routes/reviews.js';
import CartItemsRoute from './routes/CartItems.js';
import UserRouter from './routes/User.js';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy does not allow this origin"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.get("/test-cors", (req, res) => {
    res.json({ message: "CORS is working correctly" });
});

// Database connection with error handling
connectDB()
    .then(() => {
        app.use('/api/allproducts', allproductsRoute);
        app.use('/api/upload', uploadRoutes);
        app.use('/api/productImages', productImagesRoute);
        app.use('/api/reviews', reviewsRoute);
        app.use('/api/cartItems', CartItemsRoute);
        app.use('/api/user', UserRouter);
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
        process.exit(1);
    });
