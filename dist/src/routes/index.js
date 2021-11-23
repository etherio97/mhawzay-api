"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const middlewares_1 = require("@mhawzay/middlewares");
const express_1 = require("express");
const manage_1 = require("./manage");
exports.router = (0, express_1.Router)();
exports.router.use("/manage", middlewares_1.verifyAuthToken, manage_1.router);
exports.router.all("*", (req, res) => res.status(404).json({ status: 404, error: "Not Found" }));
