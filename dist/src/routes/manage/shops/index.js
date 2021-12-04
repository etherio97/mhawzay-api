"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const controllers_1 = require("@mhawzay/controllers");
const core_1 = require("@mhawzay/core");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get("/", async (req, res, next) => {
    const started = Date.now();
    try {
        const { rows } = await core_1.connection.query(`SELECT id AS shop_id, name, category, status, slug, avatar_url, cover_url FROM shops WHERE user_id = '${req.auth.uid}';`);
        res.json(rows);
    }
    catch (e) {
        next({ status: 500, message: e.message });
    }
    console.log("Load Time: %d ms", Date.now() - started);
});
exports.router.post("/", controllers_1.ShopController.validateRequestToCreate, (req, res, next) => {
    core_1.supabase
        .from("shops")
        .insert([req.body])
        .then(({ data, error }) => {
        if (error) {
            return next({
                status: 400,
                message: error.message,
            });
        }
        res.status(201).json(data[0]);
    });
});
exports.router.get("/:id", async (req, res, next) => {
    try {
        const { rows } = await core_1.connection.query(`SELECT id AS shop_id, name, category, status, slug, avatar_url, cover_url FROM shops WHERE user_id = '${req.auth.uid}' AND id = '${req.params.id}';`);
        if (!rows.length) {
            throw { status: 404, message: "Shop not found" };
        }
        res.json(rows[0]);
    }
    catch (e) {
        next({ status: e.status || 500, message: e.message });
    }
});
exports.router.delete("/:id", async (req, res, next) => {
    try {
        const { rowCount } = await core_1.connection.query(`DELETE FROM shops WHERE id = '${req.params.id}' AND user_id = '${req.auth.uid}';`);
        if (!rowCount) {
            throw { status: 404, message: "Shop not found" };
        }
        res.status(202).json({ success: true });
    }
    catch (e) {
        next({ status: e.status || 500, message: e.message });
    }
});
exports.router.post("/:id", controllers_1.ShopController.validateRequestToUpdate, async (req, res, next) => {
    try {
        const columns = Object.entries(req.body).map(([key, value]) => `${key}='${value}'`);
        const { rowCount } = await core_1.connection.query(`UPDATE shops SET ${columns.join(",")} WHERE id = '${req.params.id}' AND user_id = '${req.auth.uid}';`);
        if (!rowCount) {
            throw { status: 404, message: "Shop not found" };
        }
        res.status(202).json({ success: true });
    }
    catch (e) {
        next({ status: e.status || 500, message: e.message });
    }
});
