import { Router } from "express";
import { router as shops } from "./shops";
import { router as products } from "./products";

export const router = Router();

router.use("/shops", shops);

router.use("/products", products);
