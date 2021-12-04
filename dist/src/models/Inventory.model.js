"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModel = void 0;
const core_1 = require("@mhawzay/core");
const DEFAULT_QUERY = "stocks,products(product_id:id,name,code,price,description,image_url,category,status),updated_at,created_at";
class InventoryModel {
    static ref() {
        return core_1.supabase.from("inventories");
    }
    static select(query) {
        return this.ref().select(query || DEFAULT_QUERY);
    }
}
exports.InventoryModel = InventoryModel;
