import type { ProductWithRelations, ReviewStatus, QueryStatus } from "@/types";
import {
  demoCustomers as seedCustomers,
  demoOrders as seedOrders,
  demoQueries as seedQueries,
  demoReviews as seedAdminReviews,
  type DemoCustomer,
  type DemoOrder,
  type DemoQuery,
} from "./demo-admin";
import { sampleProducts, sampleBrands, sampleCategories } from "./sample-data";

export interface DemoReview {
  id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  rating: number;
  title: string | null;
  comment: string;
  status: ReviewStatus;
  created_at: string;
}

let products: ProductWithRelations[] | null = null;
let orders: DemoOrder[] | null = null;
let queries: DemoQuery[] | null = null;
let customers: DemoCustomer[] | null = null;
let adminReviews: DemoReview[] | null = null;

export function demoProducts(): ProductWithRelations[] {
  if (!products) products = structuredClone(sampleProducts);
  return products;
}

export function demoOrders(): DemoOrder[] {
  if (!orders) orders = structuredClone(seedOrders);
  return orders;
}

export function demoQueries(): DemoQuery[] {
  if (!queries) queries = structuredClone(seedQueries);
  return queries;
}

export function demoCustomers(): DemoCustomer[] {
  if (!customers) customers = structuredClone(seedCustomers);
  return customers;
}

export function demoAdminReviews(): DemoReview[] {
  if (!adminReviews) adminReviews = structuredClone(seedAdminReviews);
  return adminReviews;
}

export function updateDemoOrderStatus(
  id: string,
  status: DemoOrder["status"],
  adminNote?: string,
): boolean {
  const order = demoOrders().find((o) => o.id === id);
  if (!order) return false;
  order.status = status;
  if (adminNote) {
    order.admin_note = order.admin_note
      ? `${order.admin_note}\n${adminNote}`
      : adminNote;
  }
  return true;
}

export function updateDemoQueryStatus(id: string, status: QueryStatus): boolean {
  const query = demoQueries().find((q) => q.id === id);
  if (!query) return false;
  query.status = status;
  return true;
}

export function updateDemoReviewStatus(id: string, status: ReviewStatus): boolean {
  const review = demoAdminReviews().find((r) => r.id === id);
  if (!review) return false;
  review.status = status;
  return true;
}

export function updateDemoProductStatus(id: string, status: string): boolean {
  const product = demoProducts().find((p) => p.id === id);
  if (!product) return false;
  product.status = status as ProductWithRelations["status"];
  product.updated_at = new Date().toISOString();
  return true;
}

export interface DemoProductDraft {
  id?: string;
  name: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  status: string;
  seo_title: string | null;
  seo_description: string | null;
  brand_id: string | null;
  category_id: string | null;
}

export function upsertDemoProduct(draft: DemoProductDraft): string {
  const existing = draft.id ? demoProducts().find((p) => p.id === draft.id) : null;
  const now = new Date().toISOString();
  const brand = sampleBrands.find((b) => b.id === draft.brand_id) ?? null;
  const category = sampleCategories.find((c) => c.id === draft.category_id) ?? null;

  if (existing) {
    Object.assign(existing, {
      name: draft.name,
      slug: draft.slug,
      sku: draft.sku,
      short_description: draft.short_description,
      description: draft.description,
      price: draft.price,
      sale_price: draft.sale_price,
      stock_quantity: draft.stock_quantity,
      status: draft.status,
      seo_title: draft.seo_title,
      seo_description: draft.seo_description,
      brand_id: draft.brand_id,
      brand,
      category_id: draft.category_id,
      category,
      updated_at: now,
    });
    return existing.id;
  }

  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const product: ProductWithRelations = {
    id,
    name: draft.name,
    slug: draft.slug,
    brand_id: draft.brand_id,
    category_id: draft.category_id,
    subcategory_id: null,
    sku: draft.sku,
    short_description: draft.short_description,
    description: draft.description,
    price: draft.price,
    sale_price: draft.sale_price,
    stock_quantity: draft.stock_quantity,
    low_stock_threshold: 5,
    status: draft.status as ProductWithRelations["status"],
    featured: false,
    best_seller: false,
    new_arrival: false,
    seo_title: draft.seo_title,
    seo_description: draft.seo_description,
    benefits: [],
    ingredients: [],
    how_to_use: null,
    suitable_for: [],
    specifications: [],
    faqs: [],
    tags: [],
    images: [],
    brand,
    category,
    subcategory: null,
    collections: [],
    created_at: now,
    updated_at: now,
  };
  demoProducts().unshift(product);
  return id;
}

export function addDemoOrder(order: DemoOrder): void {
  demoOrders().unshift(order);
  const customer = demoCustomers().find(
    (c) => c.email.toLowerCase() === order.email.toLowerCase(),
  );
  if (customer) {
    customer.total_orders += 1;
    customer.total_spent += order.grand_total;
    customer.last_order_at = order.created_at;
  } else {
    demoCustomers().unshift({
      id: `cust-${Date.now()}`,
      name: order.customer_name,
      email: order.email,
      phone: order.phone,
      city: order.city,
      status: "ACTIVE",
      total_orders: 1,
      total_spent: order.grand_total,
      last_order_at: order.created_at,
      created_at: order.created_at,
    });
  }
}

export function addDemoQuery(input: {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
}): void {
  demoQueries().unshift({
    id: `q-${Date.now()}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    message: input.message,
    status: "NEW",
    created_at: new Date().toISOString(),
  });
}

export function addDemoReview(input: {
  product_id: string;
  product_name: string;
  customer_name: string;
  rating: number;
  title: string | null;
  comment: string;
}): void {
  demoAdminReviews().unshift({
    id: `rev-${Date.now()}`,
    product_id: input.product_id,
    product_name: input.product_name,
    customer_name: input.customer_name,
    rating: input.rating,
    title: input.title,
    comment: input.comment,
    status: "PENDING",
    created_at: new Date().toISOString(),
  });
}

export function decrementDemoStock(productId: string, quantity: number): void {
  const product = demoProducts().find((p) => p.id === productId);
  if (!product) return;
  product.stock_quantity = Math.max(0, product.stock_quantity - quantity);
  product.updated_at = new Date().toISOString();
}