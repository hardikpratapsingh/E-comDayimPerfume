import express from "express";
import upload from "../middleware/multer.js";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/product.js";

const router = express.Router();

// Add Product Route with Image Upload
router.post("/add", upload.single("image"), addProduct);

// Get All Products
router.get("/all", getProducts);

// Find Product by ID
router.get("/:id", getProductById);

// Update Product Route with Image Upload
router.put("/update/:id", upload.single("image"), updateProductById);

// Delete Product by ID
router.delete("/delete/:id", deleteProductById);

export default router;
