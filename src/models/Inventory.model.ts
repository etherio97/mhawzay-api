import { supabase } from "@mhawzay/core";

const DEFAULT_QUERY =
  "stocks,products(product_id:id,name,code,price,description,image_url,category,status),updated_at,created_at";

export class InventoryModel {
  static ref() {
    return supabase.from("inventories");
  }

  static select(query?: string) {
    return this.ref().select(query || DEFAULT_QUERY);
  }
}
