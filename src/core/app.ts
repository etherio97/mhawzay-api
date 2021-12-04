import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

export const app = express();

app.use(cors());

app.use(helmet());

app.use(json());

app.use(compression());
