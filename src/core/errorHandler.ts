"use strict";
import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status = err.status || 500;
  let error = err.message || "Something went wrong";
  res.status(status);
  res.json({ status, error });
  res.end();
}
