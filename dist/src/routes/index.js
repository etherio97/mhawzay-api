"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const manage_1 = require("./manage");
exports.router = (0, express_1.Router)();
exports.router.use("/manage", manage_1.router);
