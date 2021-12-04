"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirebaseAdmin = void 0;
const admin = __importStar(require("firebase-admin"));
const process_1 = require("process");
const path_1 = require("path");
const fs_1 = require("fs");
const config_1 = require("@mhawzay/config");
function initializeFirebaseAdmin() {
    const SERVICE_ACCOUNT_PATH = (0, path_1.join)((0, process_1.cwd)(), "serviceAccount.json");
    if (admin.apps.length) {
        return admin.app();
    }
    if (!(0, fs_1.existsSync)(SERVICE_ACCOUNT_PATH)) {
        throw new Error("serviceAccount.json is required");
    }
    const serviceAccount = JSON.parse((0, fs_1.readFileSync)(SERVICE_ACCOUNT_PATH, "utf-8"));
    const firebaseConfig = {
        projectId: config_1.FIREBASE_PROJECT_ID,
        credential: admin.credential.cert(serviceAccount),
    };
    return admin.initializeApp(firebaseConfig);
}
exports.initializeFirebaseAdmin = initializeFirebaseAdmin;
