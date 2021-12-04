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
exports.verifyAuthToken = void 0;
const admin = __importStar(require("firebase-admin"));
function verifyAuthToken(req, res, next) {
    let token;
    const started = Date.now();
    if ("authorization" in req.headers) {
        token = req.headers.authorization.replace("Bearer ", "");
    }
    if (!token) {
        return next({ status: 401, message: "Unauthorized" });
    }
    admin
        .auth()
        .verifyIdToken(token)
        .then((user) => {
        req.auth = user;
        next();
        console.log("Auth Time: %d ms", Date.now() - started);
    })
        .catch((e) => {
        let error = "Failed to authenicate";
        switch (e.code) {
            case "auth/id-token-expired":
                error = "Access token has been expired";
                break;
            case "argument-error":
                error = "Invalid access token";
                break;
            default:
                console.log("[middleware:auth]", e.code);
        }
        next({ status: 401, error });
        console.log("Auth Time: %d ms", Date.now() - started);
    });
}
exports.verifyAuthToken = verifyAuthToken;
