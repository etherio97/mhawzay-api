import { Router } from "express";
import { router as shops } from "./shops";

export const router = Router();

router.use("/shops", shops);
