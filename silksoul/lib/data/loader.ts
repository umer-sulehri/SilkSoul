import {
  sampleProducts,
  sampleBrands,
  sampleCategories,
  sampleCollections,
  sampleReviews,
  sampleSiteSettings,
} from "./sample-data";
import { createServiceClient } from "@/lib/supabase/service";
import type {
  Brand,
  Category,
  Collection,
  Product,
  ProductWithRelations,
  Review,
  SiteSettings,
} from "@/types";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

const PRODUCT_SELECT = `
  id, name, slug, brand_id, category_id, subcategory_id, sku,
  short_description, description, price, sale_price, stock_quantity,
  low_stock_threshold, status, featured, best_seller, new_arrival,
  seo_title, seo_description, benefits, ingredients, how_to_use,
  suitable_for, specifications, faqs, created_at, updated_at,
  brand:brands (id, name, slug, logo_url),
  category:categories!products_category_id_fkey (id, name, slug),
  subcategory:categories!products_subcategory_id_fkey (id, name, slug),
  images:product_images (id, image_url, alt_text, sort_order, is_primary),
  tags:product_tags (tag:tags (id, name, slug))
`;

function mapRow(row: any): ProductWithRelations {
  return {
    ...row,
    brand: row.brand ?? null,
    category: row.category ?? null,
    subcategory: row.subcategory ?? null,
    tags: (row.tags ?? []).map((t: any) => t.tag).filter(Boolean),
    images: (row.images ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order),
    benefits: row.benefits ?? [],
    ingredients: row.ingredients ?? [],
    suitable_for: row.suitable_for ?? [],
    specifications: row.specifications ?? [],
    faqs: row.faqs ?? [],
  };
}

export async function fetchProducts(options?: {
  status?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  categorySlug?: string;
  brandSlug?: string;
  search?: string;
  sort?: string;
}): Promise<ProductWithRelations[]> {
  if (!isSupabaseConfigured()) {
    let products = [...sampleProducts];
    const { status, featured, bestSeller, newArrival, categorySlug, brandSlug, search, sort } =
      options ?? {};
    if (status) products = products.filter((p) => p.status === status);
    if (featured) products = products.filter((p) => p.featured);
    if (bestSeller) products = products.filter((p) => p.best_seller);
    if (newArrival) products = products.filter((p) => p.new_arrival);
    if (categorySlug)
      products = products.filter(
        (p) => p.category?.slug === categorySlug || p.subcategory?.slug === categorySlug,
      );
    if (brandSlug) products = products.filter((p) => p.brand?.slug === brandSlug);
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.name.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q) ||
          p.short_description?.toLowerCase().includes(q),
      );
    }
    if (sort === "price-asc") products.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    if (sort === "price-desc") products.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    if (sort === "newest") products.sort((a, b) => (b.created_at > a.created_at ? 1 : -1));
    return products;
  }

  const supabase = createServiceClient();
  let query = supabase.from("products").select(PRODUCT_SELECT).order("created_at", { ascending: false });

  if (options?.status) query = query.eq("status", options.status);
  if (options?.featured) query = query.eq("featured", true);
  if (options?.bestSeller) query = query.eq("best_seller", true);
  if (options?.newArrival) query = query.eq("new_arrival", true);
  if (options?.brandSlug)
    query = query.filter("brands.slug", "eq", options.brandSlug);
  if (options?.search) query = query.ilike("name", `%${options.search}%`);
  if (options?.sort === "price-asc") query = query.order("price", { ascending: true });
  if (options?.sort === "price-desc") query = query.order("price", { ascending: false });

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
}

export async function fetchProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  if (!isSupabaseConfigured()) {
    return sampleProducts.find((p) => p.slug === slug) ?? null;
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("status", "PUBLISHED")
    .single();
  if (error) return null;
  return mapRow(data);
}

export async function fetchProductById(id: string): Promise<ProductWithRelations | null> {
  if (!isSupabaseConfigured()) {
    return sampleProducts.find((p) => p.id === id) ?? null;
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .single();
  if (error) return null;
  return mapRow(data);
}

export async function fetchCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return sampleCategories;
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("categories")
    .select("*, products:products!products_category_id_fkey(count)")
    .eq("status", "ACTIVE")
    .order("sort_order", { ascending: true });
  return (data ?? []).map((c: any) => ({
    ...c,
    product_count: Array.isArray(c.products) ? c.products.length : c.products?.count ?? 0,
  }));
}

export async function fetchBrands(): Promise<Brand[]> {
  if (!isSupabaseConfigured()) {
    return sampleBrands;
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("brands")
    .select("*, products:products(count)")
    .eq("status", "ACTIVE")
    .order("name", { ascending: true });
  return (data ?? []) as Brand[];
}

export async function fetchCollections(): Promise<Collection[]> {
  if (!isSupabaseConfigured()) {
    return sampleCollections;
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("collections")
    .select("*")
    .eq("status", "ACTIVE")
    .order("created_at", { ascending: false });
  return (data ?? []) as Collection[];
}

export async function fetchCollectionProducts(slug: string): Promise<ProductWithRelations[]> {
  if (!isSupabaseConfigured()) {
    const collection = sampleCollections.find((c) => c.slug === slug);
    if (!collection) return [];
    const productIds = new Set(
      [
        ["best-sellers", ["prod-face-wash", "prod-hair-oil", "prod-vitc-serum", "prod-sunscreen"]],
        ["new-arrivals", ["prod-vitc-serum", "prod-sunscreen", "prod-herbal-shampoo", "prod-hair-serum"]],
        ["acne-care", ["prod-face-wash", "prod-niacinamide", "prod-cleanser"]],
      ].find(([s]) => s === slug)?.[1] ?? [],
    );
    return sampleProducts.filter((p) => productIds.has(p.id));
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("collection_products")
    .select(`product_id, collections!inner(slug, name)`)
    .eq("collections.slug", slug);
  const productIds = (data ?? []).map((d: any) => d.product_id);
  if (productIds.length === 0) return [];
  const { data: products } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .in("id", productIds)
    .eq("status", "PUBLISHED");
  return (products ?? []).map(mapRow);
}

export async function fetchReviews(productId?: string): Promise<Review[]> {
  if (!isSupabaseConfigured()) {
    return productId
      ? sampleReviews.filter((r) => r.product_id === productId)
      : sampleReviews;
  }
  const supabase = createServiceClient();
  let query = supabase
    .from("reviews")
    .select("id, product_id, rating, title, comment, status, created_at, customers(name)")
    .eq("status", "APPROVED");
  if (productId) query = query.eq("product_id", productId);
  const { data } = await query;
  return (data ?? []).map((r: any) => ({
    id: r.id,
    product_id: r.product_id,
    customer_name: r.customers?.name ?? "Verified Customer",
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    status: r.status,
    created_at: r.created_at,
  }));
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    return sampleSiteSettings;
  }
  const supabase = createServiceClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.key] = row.value;
  return {
    site_name: map.site_name ?? "SilkSoul",
    logo: map.logo ?? null,
    support_email: map.support_email ?? null,
    support_phone: map.support_phone ?? null,
    whatsapp_number: map.whatsapp_number ?? null,
    currency: map.currency ?? "PKR",
    delivery_message: map.delivery_message ?? "",
    announcement_bar_enabled: map.announcement_bar_enabled === "true",
    announcement_bar_text: map.announcement_bar_text ?? "",
    free_delivery_threshold: Number(map.free_delivery_threshold ?? 3000),
    standard_delivery_fee: Number(map.standard_delivery_fee ?? 200),
  };
}

export async function fetchAllProductsAdmin(): Promise<any[]> {
  if (!isSupabaseConfigured()) {
    return sampleProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand?.name,
      price: p.price,
      stock_quantity: p.stock_quantity,
      status: p.status,
      created_at: p.created_at,
      image_url: p.images[0]?.image_url ?? null,
    }));
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("products")
    .select("id, name, slug, price, stock_quantity, status, created_at, brands(name), product_images(image_url, sort_order)")
    .eq("product_images.is_primary", true);
  return (data ?? []).map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    brand: p.brands?.name,
    price: p.price,
    stock_quantity: p.stock_quantity,
    status: p.status,
    created_at: p.created_at,
    image_url: p.product_images?.[0]?.image_url ?? null,
  }));
}

export { sampleProducts as fallbackProducts };