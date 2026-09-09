import { createServiceClient } from "@/lib/supabase/service";
import { isSupabaseConfigured } from "@/lib/data/loader";
import {
  demoCustomers,
  demoOrders,
  demoQueries,
  demoAdminReviews,
  demoProducts,
} from "@/lib/data/demo-store";
import { type DemoOrder } from "@/lib/data/demo-admin";
import { sampleProducts, sampleReviews } from "@/lib/data/sample-data";
import type { OrderStatus, QueryStatus, ReviewStatus } from "@/types";

export type AdminOrder = DemoOrder;

export interface AdminOrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  notes: string | null;
  subtotal: number;
  delivery_fee: number;
  grand_total: number;
  status: OrderStatus;
  admin_note: string | null;
  coupon_code: string | null;
  coupon_discount: number;
  created_at: string;
  items: {
    id: string;
    product_id: string;
    product_name: string;
    product_image: string | null;
    unit_price: number;
    quantity: number;
    line_total: number;
  }[];
}

export interface AdminQuery {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: QueryStatus;
  created_at: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  status: string;
  total_orders: number;
  total_spent: number;
  last_order_at: string | null;
  created_at: string;
}

export interface AdminReview {
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

export interface DashboardStats {
  revenue: number;
  orderCount: number;
  pendingOrders: number;
  productCount: number;
  customerCount: number;
  newQueries: number;
  pendingReviews: number;
}

const ORDER_ITEM_SELECT = `
  id, product_id, product_name, product_image, unit_price, quantity, line_total
`;
const ORDER_SELECT = `
  id, order_number, customer_name, email, phone, address, city, notes,
  subtotal, delivery_fee, grand_total, status, admin_note, coupon_code,
  coupon_discount, created_at,
  order_items (${ORDER_ITEM_SELECT})
`;

const num = (v: unknown) => Number(v ?? 0);

export async function fetchAdminOrders(options?: {
  status?: OrderStatus | "ALL";
  search?: string;
}): Promise<AdminOrder[]> {
  if (!isSupabaseConfigured()) {
    let rows = demoOrders();
    if (options?.status) rows = rows.filter((o) => o.status === options.status);
    if (options?.search) {
      const q = options.search.toLowerCase();
      rows = rows.filter(
        (o) =>
          o.order_number.toLowerCase().includes(q) ||
          o.customer_name.toLowerCase().includes(q) ||
          (o.city ?? "").toLowerCase().includes(q),
      );
    }
    return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  const supabase = createServiceClient();
  let query = supabase
    .from("orders")
    .select(ORDER_SELECT)
    .order("created_at", { ascending: false });

  if (options?.status && options.status !== "ALL") {
    query = query.eq("status", options.status);
  }
  if (options?.search) {
    const q = `%${options.search}%`;
    query = query.or(`order_number.ilike.${q},customer_name.ilike.${q},city.ilike.${q}`);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data ?? []).map((o: any) => ({
    id: o.id,
    order_number: o.order_number,
    customer_name: o.customer_name,
    email: o.email,
    phone: o.phone,
    address: o.address,
    city: o.city,
    notes: o.notes,
    subtotal: num(o.subtotal),
    delivery_fee: num(o.delivery_fee),
    grand_total: num(o.grand_total),
    status: o.status as OrderStatus,
    admin_note: o.admin_note,
    coupon_code: o.coupon_code,
    coupon_discount: num(o.coupon_discount),
    created_at: o.created_at,
    items: (o.order_items ?? []).map((i: any) => ({
      id: i.id,
      product_id: i.product_id,
      product_name: i.product_name,
      product_image: i.product_image,
      unit_price: num(i.unit_price),
      quantity: i.quantity,
      line_total: num(i.line_total),
    })),
  }));
}

export async function fetchAdminOrder(id: string): Promise<AdminOrder | null> {
  const all = await fetchAdminOrders();
  return all.find((o) => o.id === id) ?? null;
}

export async function fetchAdminQueries(): Promise<AdminQuery[]> {
  if (!isSupabaseConfigured()) {
    return [...demoQueries()].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("queries")
    .select("id, name, email, phone, subject, message, status, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminQuery[];
}

export async function fetchAdminCustomers(): Promise<AdminCustomer[]> {
  if (!isSupabaseConfigured()) {
    return [...demoCustomers()].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase.from("customers").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    city: c.city,
    status: "ACTIVE",
    total_orders: 0,
    total_spent: 0,
    last_order_at: null,
    created_at: c.created_at,
  }));
}

export async function fetchAdminReviews(): Promise<AdminReview[]> {
  if (!isSupabaseConfigured()) {
    const names = new Map(sampleProducts.map((p) => [p.id, p.name]));
    const demo = demoAdminReviews().map((r) => ({
      ...r,
      product_name:
        r.product_name || (names.get(r.product_id) ?? "Unknown product"),
    }));
    const approved = sampleReviews.filter((r) => r.status === "APPROVED").map((r) => ({
      id: r.id,
      product_id: r.product_id,
      product_name: names.get(r.product_id) ?? "Unknown product",
      customer_name: r.customer_name,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      status: r.status as ReviewStatus,
      created_at: r.created_at,
    }));
    return [...demo, ...approved].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, product_id, rating, title, comment, status, created_at, customers(name), products(name)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map((r: any) => ({
    id: r.id,
    product_id: r.product_id,
    product_name: r.products?.name ?? "Unknown product",
    customer_name: r.customers?.name ?? "Guest",
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    status: r.status as ReviewStatus,
    created_at: r.created_at,
  }));
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const [orders, products, queries, reviews] = await Promise.all([
    fetchAdminOrders(),
    fetchAllProductsCount(),
    fetchAdminQueries(),
    fetchAdminReviews(),
  ]);

  const paidStatuses: OrderStatus[] = ["APPROVED", "PROCESSING", "SHIPPED", "DELIVERED"];
  const revenue = orders
    .filter((o) => paidStatuses.includes(o.status))
    .reduce((sum, o) => sum + o.grand_total, 0);
  return {
    revenue,
    orderCount: orders.length,
    pendingOrders: orders.filter((o) => o.status === "PENDING").length,
    productCount: products,
    customerCount: (await fetchAdminCustomers()).length,
    newQueries: queries.filter((q) => q.status === "NEW").length,
    pendingReviews: reviews.filter((r) => r.status === "PENDING").length,
  };
}

async function fetchAllProductsCount(): Promise<number> {
  if (!isSupabaseConfigured()) return demoProducts().length;
  const supabase = createServiceClient();
  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}