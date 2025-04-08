import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';  // For password hashing
import jwt from 'jsonwebtoken';
import auth from '../middlewares/auth.js';

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

router.put("/updateProfile", auth,async (req, res) => {
    try {
      const formData = req.body;
      var profile = "Profile";
  
      // Assuming `req.user._id` is coming from auth middleware
      const findUser = await User.findById(req.user._id);
  
      if (!findUser) {
        return res.status(400).json({ success: false, message: "User not found" });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(formData.password, findUser.password);
  
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid password" });
      }
  
      // Update fields (excluding password)
      for (let key in formData) {
        if(key === "newPassword"){
            const hashedPassword = await bcrypt.hash(formData.newPassword, 10);
            findUser.password = hashedPassword;
            profile = "Password";
            continue;
        }
        else if (key !== "password") {
          findUser[key] = formData[key];
        }
      }
  
      await findUser.save();
  
      return res.status(200).json({ success: true, message: `${profile} updated successfully` });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  router.put("/default-address", auth, async (req, res) => {
    try {
      const { addressId } = req.body;
  
      if (!addressId) {
        return res.status(400).json({ success: false, message: "Address ID is required" });
      }
  
      const findUser = await User.findById(req.user._id);
      if (!findUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Set only the matching address as default
      findUser.address = findUser.address.map(addr => ({
        ...addr.toObject(), // ensure it's a plain object
        isDefault: addr._id.toString() === addressId.toString()
      }));
  
      await findUser.save();
  
      return res.status(200).json({ success: true, message: "Default address updated successfully" });
  
    } catch (err) {
      console.error("Error in /default-address:", err);
      res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  });
  

  router.post('/addAddress', auth, async (req, res) => {
    try {
      const { formData } = req.body;
      const findUser = await User.findById(req.user._id);
  
      if (!findUser) {
        return res.status(400).json({ success: false, message: "User not found" });
      }
  
      // Push the new address to the user's address array
      if(findUser.address.length === 0){
        formData.isDefault = true;
      }

      findUser.address.push(formData);
      const addressArray = findUser.address;

      // Save the updated user document
      await findUser.save();
  
      return res.status(200).json({ success: true, message: "New Address added", addressArray });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });
  


export default router;
