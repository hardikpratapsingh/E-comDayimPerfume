import express from "express";
import { addAddress, getAddress } from "../controllers/address.js";
import { Authenticated } from "../middleware/auth.js";

const router = express.Router();

// add address
router.post("/add", Authenticated, addAddress);

// get address
router.get('/get',Authenticated, getAddress)

export default router;