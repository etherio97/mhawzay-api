"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopController = void 0;
const core_1 = require("@mhawzay/core");
class ShopController {
    static validateRequestToCreate(req, res, next) {
        const errors = [];
        let { name, category, slug, avatar_url, cover_url, status } = req.body;
        if (typeof name !== "string") {
            errors.push("name must be string");
        }
        if (typeof category !== "string") {
            errors.push("category must be string");
        }
        if (slug && typeof slug !== "string") {
            errors.push("slug must be string");
        }
        if (avatar_url === '') {
            avatar_url = undefined;
        }
        if (avatar_url && typeof avatar_url !== "string") {
            errors.push("avatar_url must be string");
        }
        if (cover_url === '') {
            cover_url = undefined;
        }
        if (cover_url && typeof cover_url !== "string") {
            errors.push("cover_url must be string");
        }
        if (!status) {
            status = "UNPUBLISHED";
        }
        if (!["PUBLISHED", "UNPUBLISHED"].includes(status)) {
            errors.push("status must be either PUBLISHED or UNPUBLISHED");
        }
        if (errors.length) {
            return next({ status: 400, message: errors.join(". ") });
        }
        req.body = {
            name,
            category,
            slug,
            avatar_url,
            cover_url,
            status,
            user_id: req.auth.uid,
        };
        next();
    }
    static validateRequestToUpdate(req, res, next) {
        const errors = [];
        let { name, category, slug, avatar_url, cover_url, status } = req.body;
        if (name && typeof name !== "string") {
            errors.push("name must be string");
        }
        if (category && typeof category !== "string") {
            errors.push("category must be string");
        }
        if (slug && typeof slug !== "string") {
            errors.push("slug must be string");
        }
        if (avatar_url && typeof avatar_url !== "string") {
            errors.push("avatar_url must be string");
        }
        if (cover_url && typeof cover_url !== "string") {
            errors.push("cover_url must be string");
        }
        if (status && !["PUBLISHED", "UNPUBLISHED"].includes(status)) {
            errors.push("status must be either PUBLISHED or UNPUBLISHED");
        }
        if (errors.length) {
            return next({ status: 400, message: errors.join(". ") });
        }
        req.body = (0, core_1.nullSafe)({
            name,
            category,
            slug,
            avatar_url,
            cover_url,
            status,
        });
        next();
    }
}
exports.ShopController = ShopController;
