import { Product } from "./Product";

export interface Sales {
  quantity: number;
  status: "CONFIRM" | "UNCONFIRM" | "CANCEL";
  user_id: string;
  created_at: string;
  products: Product;
}
