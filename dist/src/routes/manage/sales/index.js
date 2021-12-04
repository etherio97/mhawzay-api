"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const orders_1 = require("./orders");
exports.router = (0, express_1.Router)();
exports.router.use("/orders", orders_1.router);
