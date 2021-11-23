"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const shops_1 = require("./shops");
const products_1 = require("./products");
exports.router = (0, express_1.Router)();
exports.router.use("/shops", shops_1.router);
exports.router.use("/products", products_1.router);
