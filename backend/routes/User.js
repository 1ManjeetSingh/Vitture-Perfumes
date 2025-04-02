import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';  // For password hashing
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/createUser', async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: name,
            email,
            password: hashedPassword,
        });

        await newUser.save(); // Save to DB
        return res.status(201).json({ success: true, message: "User created successfully", data: newUser });

    } catch (err) {
        console.error(err); // Log errors in console
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, user: findUser, message: `Welcome ${findUser.fullName}` })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
})


export default router;
