"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const core_1 = require("@mhawzay/core");
class ProductController {
    static validateRequestToCreate(req, res, next) {
        const errors = [];
        const { shop_id } = req.query;
        let { name, price, category, code, image_url, description, status, } = req.body;
        if (typeof shop_id !== "string") {
            return next({
                status: 400,
                message: "required shop_id query paramater",
            });
        }
        if (typeof name !== "string") {
            errors.push("name must be string");
        }
        if (typeof price !== "number") {
            errors.push("price must be number");
        }
        if (typeof category !== "string") {
            errors.push("category must be string");
        }
        if (code && typeof code !== "string") {
            errors.push("code must be string");
        }
        if (image_url && typeof image_url !== "string") {
            errors.push("image_url must be string");
        }
        if (description && typeof description !== "string") {
            errors.push("description must be string");
        }
        if (!status) {
            status = "DRAFT";
        }
        if (!["ACTIVE", "INACTIVE", "DRAFT"].includes(status)) {
            errors.push("status must be ACTIVE, INACTIVE and DRAFT");
        }
        if (errors.length) {
            return next({ status: 400, message: errors.join(". ") });
        }
        req.body = {
            name,
            price,
            category,
            code,
            image_url,
            description,
            status,
            shop_id,
            user_id: req.auth.uid,
        };
        next();
    }
    static validateRequestToUpdate(req, res, next) {
        const errors = [];
        let { name, price, category, code, image_url, description, status, } = req.body;
        if (name && typeof name !== "string") {
            errors.push("name must be string");
        }
        if (price && typeof price !== "number") {
            errors.push("price must be number");
        }
        if (category && typeof category !== "string") {
            errors.push("category must be string");
        }
        if (code && typeof code !== "string") {
            errors.push("code must be string");
        }
        if (image_url && typeof image_url !== "string") {
            errors.push("image_url must be string");
        }
        if (description && typeof description !== "string") {
            errors.push("description must be string");
        }
        if (status && !["ACTIVE", "INACTIVE", "DRAFT"].includes(status)) {
            errors.push("status must be ACTIVE, INACTIVE and DRAFT");
        }
        if (errors.length) {
            return next({ status: 400, message: errors.join(". ") });
        }
        req.body = (0, core_1.nullSafe)({
            name,
            price,
            category,
            code,
            image_url,
            description,
            status,
        });
        next();
    }
}
exports.ProductController = ProductController;
