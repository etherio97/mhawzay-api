import { Router } from "express";
import { router as shops } from "./shops";
import { router as products } from "./products";
import { router as inventories } from "./inventories";
import { router as sales } from "./sales";

export const router = Router();

router.use("/shops", shops);
router.use("/products", products);
router.use("/inventories", inventories);
router.use("/sales", sales);
