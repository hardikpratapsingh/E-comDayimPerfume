// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     images: [String],
//     category: { type: String },
//     stock: { type: Number, default: 0 },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Product", ProductSchema);



import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  qty: { type: Number, require: true },
  imgSrc: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

export const Products = mongoose.model("Products",productSchema)