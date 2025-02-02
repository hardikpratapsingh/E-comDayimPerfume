// const jwt = require('jsonwebtoken');

// // Admin authentication middleware
// const adminAuth = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(403).json({ message: 'Access denied' });

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// module.exports = adminAuth;


import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) return res.json({ message: "Login first" });

  const decoded = jwt.verify(token, "!@#$%^&*()");

  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ message: "User not exist" });

  req.user = user;
  next();

  // console.log(decoded)
};