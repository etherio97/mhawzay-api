import { supabase } from "@mhawzay/core";

const DEFAULT_QUERY =
  "shops(user_id),products(product_id:id,name,code,price,description,image_url,category,status),quantity,status,user_id,created_at";

export class SalesOrderModel {
  static ref() {
    return supabase.from("sales_orders");
  }

  static select(query?: string) {
    return this.ref().select(query || DEFAULT_QUERY);
  }
}
