export interface Product {
  name: string;
  category: string;
  price: number;
  user_id: string;
  shop_id: string;
  code?: string;
  description?: string;
  status?: "ACTIVE" | "INACTIVE" | "DRAFT";
  image_url?: string;
}
