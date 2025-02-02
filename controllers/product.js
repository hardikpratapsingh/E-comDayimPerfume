import { Products } from "../models/product.js";
import path from "path";

// Add Product with Image Upload
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty } = req.body;

  try {
    // Validate if an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required!" });
    }

    const imgSrc = `/uploads/${req.file.filename}`;

    // Create product
    let product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });

    res.json({ message: "Product added successfully!", product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  let products = await Products.find().sort({ createdAt: -1 });
  res.json({ message: "All products", products });
};

// Find Product by ID
export const getProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findById(id);
  if (!product) return res.json({ message: "Invalid Id" });
  res.json({ message: "Specific product", product });
};

// Update Product by ID with Image Upload
export const updateProductById = async (req, res) => {
  const id = req.params.id;

  try {
    let product = await Products.findById(id);
    if (!product) return res.status(404).json({ message: "Invalid Id" });

    const { title, description, price, category, qty } = req.body;

    // Update product details
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.qty = qty || product.qty;

    // If a new image is uploaded, update imgSrc
    if (req.file) {
      product.imgSrc = `/uploads/${req.file.filename}`;
    }

    await product.save();
    res.json({ message: "Product has been updated", product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Delete Product by ID
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndDelete(id);
  if (!product) return res.json({ message: "Invalid Id" });
  res.json({ message: "Product has been deleted", product });
};
