import { Router } from "express";
import { router as signin } from "./signin";
import { router as signup } from "./signup";

export const router = Router();

router.use("/signin", signin);
router.use("/signup", signup);
