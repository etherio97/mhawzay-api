"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPABASE_SECRET = exports.SUPABASE_URL = exports.FIREBASE_PROJECT_ID = exports.PORT = void 0;
const process_1 = require("process");
exports.PORT = process_1.env.PORT || 3000;
exports.FIREBASE_PROJECT_ID = process_1.env.FIREBASE_PROJECT_ID;
exports.SUPABASE_URL = process_1.env.SUPABASE_URL;
exports.SUPABASE_SECRET = process_1.env.SUPABASE_SECRET;
