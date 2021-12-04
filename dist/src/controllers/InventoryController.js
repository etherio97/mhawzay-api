"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
class InventoryController {
    static validateRequestToCreate(req, res, next) {
        const errors = [];
        let { product_id, stocks } = req.body;
        let { shop_id } = req.query;
        if (typeof shop_id !== "string" && typeof shop_id !== "number") {
            return next({
                status: 400,
                message: "required shop_id in query",
            });
        }
        if (typeof product_id !== "number") {
            errors.push("product_id must be number");
        }
        if (typeof stocks !== "number") {
            errors.push("stocks must be number");
        }
        if (errors.length) {
            return next({ status: 400, message: errors.join(". ") });
        }
        req.body = {
            product_id,
            stocks,
            shop_id: parseInt(shop_id),
            user_id: req.auth.uid,
        };
        next();
    }
}
exports.InventoryController = InventoryController;
