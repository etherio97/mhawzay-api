"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const controllers_1 = require("@mhawzay/controllers");
const core_1 = require("@mhawzay/core");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res, next) => {
    core_1.supabase
        .from("shops")
        .select("shop_id:id,name,category,status,slug,avatar_url,cover_url")
        .eq("user_id", req.auth.uid)
        .then(({ data, error }) => {
        if (error) {
            return next({
                status: 400,
                message: error.message,
            });
        }
        res.json(data);
    });
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
exports.router.get("/:id", (req, res, next) => {
    core_1.supabase
        .from("shops")
        .select("shop_id:id,name,category,status,slug,avatar_url,cover_url")
        .eq("id", req.params.id)
        .eq("user_id", req.auth.uid)
        .then(({ data, error }) => {
        if (error) {
            return next({
                status: 400,
                message: error.message,
            });
        }
        if (!data.length) {
            return next({
                status: 404,
                message: "Shop not found",
            });
        }
        res.json(data[0]);
    });
});
exports.router.delete("/:id", (req, res, next) => {
    core_1.supabase
        .from("shops")
        .delete()
        .eq("id", req.params.id)
        .eq("user_id", req.auth.uid)
        .then(({ data, error }) => {
        if (error) {
            return next({
                status: 400,
                message: error.message,
            });
        }
        if (!data.length) {
            return next({
                status: 404,
                message: "Shop not found",
            });
        }
        res.status(200).json({ shop_id: data[0].id });
    });
});
exports.router.patch("/:id", controllers_1.ShopController.validateRequestToUpdate, (req, res, next) => {
    core_1.supabase
        .from("shops")
        .update(req.body)
        .eq("id", req.params.id)
        .eq("user_id", req.auth.uid)
        .then(({ data, error }) => {
        if (error) {
            return next({
                status: 400,
                message: error.message,
            });
        }
        if (!data.length) {
            return next({
                status: 404,
                message: "Shop not found",
            });
        }
        res.status(200).json(req.body);
    });
});
