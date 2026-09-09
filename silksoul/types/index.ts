export const ORDER_STATUSES = [
  "PENDING",
  "UNDER_REVIEW",
  "ACCEPTED",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "REJECTED",
  "CANCELLED",
  "RETURNED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  UNDER_REVIEW: "Under Review",
  ACCEPTED: "Accepted",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
  RETURNED: "Returned",
};

export const PRODUCT_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const QUERY_STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"] as const;
export type QueryStatus = (typeof QUERY_STATUSES)[number];

export const REVIEW_STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export const ROLES = ["CUSTOMER", "ADMIN", "SUPER_ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  banner_url: string | null;
  status: string;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  status: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  product_count?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  low_stock_threshold: number;
  status: ProductStatus;
  featured: boolean;
  best_seller: boolean;
  new_arrival: boolean;
  seo_title: string | null;
  seo_description: string | null;
  benefits: string[] | null;
  ingredients: string[] | null;
  how_to_use: string | null;
  suitable_for: string[] | null;
  specifications: { key: string; value: string }[] | null;
  faqs: { question: string; answer: string }[] | null;
  tags: Tag[];
  images: ProductImage[];
  variant_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductWithRelations extends Product {
  brand: Brand | null;
  category: Category | null;
  subcategory: Category | null;
  collections: Collection[];
  review_count?: number;
  rating?: number;
  tags: Tag[];
  images: ProductImage[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_name: string;
  sku: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
  image_url?: string | null;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  status: OrderStatus;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  customer_notes: string | null;
  admin_notes: string | null;
  rejection_reason: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  postal_code: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: string;
  created_at: string;
  total_orders?: number;
  total_spent?: number;
  last_order_at?: string | null;
}

export interface Query {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string;
  message: string;
  status: QueryStatus;
  admin_reply: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  title: string | null;
  comment: string;
  status: ReviewStatus;
  created_at: string;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  brand: string;
  price: number;
  salePrice: number | null;
  quantity: number;
  stock: number;
  sku?: string | null;
  variantName?: string | null;
  variantId?: string | null;
}

export interface SiteSettings {
  site_name: string;
  logo: string | null;
  support_email: string | null;
  support_phone: string | null;
  whatsapp_number: string | null;
  currency: string;
  delivery_message: string;
  announcement_bar_enabled: boolean;
  announcement_bar_text: string;
  free_delivery_threshold: number;
  standard_delivery_fee: number;
}