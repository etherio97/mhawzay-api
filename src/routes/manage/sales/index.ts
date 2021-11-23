import { Router } from "express";
import { router as orders } from "./orders";

export const router = Router();

router.use("/orders", orders);
