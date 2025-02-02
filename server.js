// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");
// // const productRoutes = require("./routes/productRoutes");
// // const userRoutes = require("./routes/userRoutes");
// const errorHandler = require("./middleware/errorHandler");
// const paymentRoutes = require("./routes/paymentRoutes");

// const productRoutes = require('./routes/admin/productRoutes');
// const orderRoutes = require('./routes/admin/orderRoutes');

// const authRoutes = require('./routes/authRoutes');

// const { registerUser } = require("./controllers/register");
// const { loginUser } = require("./controllers/login");

// dotenv.config(); // Load environment variables
// connectDB();

// const app = express();
// app.use(express.json());

// app.use(cors());

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/products", productRoutes);
// app.use("/api/payment", paymentRoutes);
// // app.use("/api/users", userRoutes);

// // Admin Routes
// // app.use('/api/admin', productRoutes);
// app.use('/api/admin', orderRoutes);

// // Registration Endpoint
// app.post("/api/register", registerUser);

// // Login Endpoint
// app.post("/api/login", loginUser);

// // Other middleware...
// app.use('/api/auth', authRoutes);

// // Error handler middleware
// app.use(errorHandler);

// // Start Server

// // Connect to Database and Start Server
// connectDB().then(() => {
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
// );
// }

// );



import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'
import cartRouter from './routes/cart.js'
import addressRouter from './routes/address.js'
import paymentRouter from './routes/payment.js'
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config()


app.use(bodyParser.json())

app.use(cors({
  origin: ['http://localhost:5173','https://e-comm-dayim.vercel.app/'],
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("public/uploads"));




// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))



// user Router
app.use('/api/user',userRouter)

// product Router
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)

// address Router
app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))