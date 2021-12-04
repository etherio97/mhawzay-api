"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const models_1 = require("@mhawzay/models");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res, next) => {
    const { uid } = req.auth;
    const { shop_id } = req.query;
    if (!shop_id) {
        return next({ status: 400, message: "required shop_id in query" });
    }
    models_1.SalesOrderModel.select()
        .eq("shop_id", shop_id)
        .then(({ error, data }) => {
        if (error) {
            return next({ status: 400, message: error.message });
        }
        res.setHeader("cache-control", "private, max-age=300");
        if (data.length) {
            if (data[0].shops.user_id !== uid) {
                return next({ status: 403, message: "Forbidden" });
            }
            data = data.map((val) => {
                delete val.shops;
                return val;
            });
            return res.json(data);
        }
        res.json([]);
    });
});
