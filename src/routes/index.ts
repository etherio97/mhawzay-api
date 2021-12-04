import { verifyAuthToken } from "@mhawzay/middlewares";
import { Router } from "express";
import { router as manage } from "./manage";

export const router = Router();

router.use("/manage", verifyAuthToken, manage);

router.all("*", (req, res) =>
  res.status(404).json({ status: 404, error: "Not Found" })
);
