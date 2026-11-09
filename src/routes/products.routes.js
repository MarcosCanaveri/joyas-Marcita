import express from "express";

const router = express.Router();

import { getAllProducts, getProductById, createProduct } from "../controllers/products.controllers.js";

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", createProduct);

export default router;