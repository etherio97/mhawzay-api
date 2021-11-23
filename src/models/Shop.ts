export interface Shop {
  name: string;
  category: string;
  user_id: string;
  status?: "PUBLISHED" | "UNPUBLISHED";
  slug?: string;
  avatar_url?: string;
  cover_url?: string;
}
