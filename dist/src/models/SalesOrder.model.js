"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderModel = void 0;
const core_1 = require("@mhawzay/core");
const DEFAULT_QUERY = "shops(user_id),products(product_id:id,name,code,price,description,image_url,category,status),quantity,status,user_id,created_at";
class SalesOrderModel {
    static ref() {
        return core_1.supabase.from("sales_orders");
    }
    static select(query) {
        return this.ref().select(query || DEFAULT_QUERY);
    }
}
exports.SalesOrderModel = SalesOrderModel;
