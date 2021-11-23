import { Request as ExpressRequest } from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export interface Request<T = any> extends ExpressRequest {
  auth: DecodedIdToken;
  body: T;
}
