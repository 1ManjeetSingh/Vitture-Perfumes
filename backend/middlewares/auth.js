import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId); // or decoded._id
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // 👈 Attach user to the request

    next();
  } catch (error) {
    res.status(401).send({
      message: "You are not authenticated",
      data: error,
      success: false,
    });
  }
};

export default auth;