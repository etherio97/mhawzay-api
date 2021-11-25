import { env } from "process";

export const PORT: string | number = env.PORT || 3000;

export const FIREBASE_PROJECT_ID: string = env.FIREBASE_PROJECT_ID;

export const SUPABASE_URL: string = env.SUPABASE_URL;

export const SUPABASE_SECRET: string = env.SUPABASE_SECRET;

export const EMAIL_VALIDATION_PATTERN = /^\w+@[a-z]+\.[a-z]{2,6}$/;
