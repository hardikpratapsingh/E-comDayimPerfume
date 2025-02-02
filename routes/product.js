// import express from 'express'
// import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/product.js';

// const router = express.Router();

// // add product
// router.post('/add',addProduct)

// // get product
// router.get('/all',getProducts)

// // get product by Id
// router.get('/:id',getProductById)

// // update product by Id
// router.put('/:id',updateProductById)

// // delete product by Id
// router.delete('/:id',deleteProductById)


// export default router


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
