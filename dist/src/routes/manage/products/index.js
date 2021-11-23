"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const controllers_1 = require("@mhawzay/controllers");
const core_1 = require("@mhawzay/core");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res, next) => {
    const { shop_id } = req.query;
    if (!shop_id) {
        return next({
            status: 400,
            message: "required shop_id query paramater",
        });
    }
    core_1.supabase
        .from("products")
        .select("product_id:id,name,code,price,description,image_url,category,status")
        .eq("user_id", req.auth.uid)
        .eq("shop_id", shop_id)
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
exports.router.post("/", controllers_1.ProductController.validateRequestToCreate, (req, res, next) => {
    core_1.supabase
        .from("products")
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
exports.router.delete("/:id", (req, res, next) => {
    core_1.supabase
        .from("products")
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
                message: "Product not found",
            });
        }
        let product = data[0];
        res.status(200).json({ product_id: product.id });
    });
});
exports.router.patch("/:id", controllers_1.ProductController.validateRequestToUpdate, (req, res, next) => {
    core_1.supabase
        .from("products")
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
                message: "Product not found",
            });
        }
        res.status(200).json(req.body);
    });
});
