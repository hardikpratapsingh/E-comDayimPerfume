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
  origin:true,
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
