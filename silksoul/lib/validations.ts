import { z } from "zod";

export const productOptionSchema = z.object({
  productId: z.string().uuid().or(z.string().min(1)),
  quantity: z.number().int().min(1).max(99).default(1),
  unitPrice: z.number().min(0),
  name: z.string().min(1),
  image: z.string().nullable().optional(),
});

export const cartSchema = z.object({
  items: z.array(productOptionSchema).max(50),
});

export const checkoutSchema = z.object({
  items: z.array(productOptionSchema).min(1).max(50),
  customerName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(190),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s-]{7,20}$/, "Please enter a valid phone number"),
  address: z.string().trim().min(5, "Please enter your delivery address").max(500),
  city: z.string().trim().min(2, "Please enter your city").max(100),
  notes: z.string().trim().max(1000).optional().default(""),
});

export const orderNoteSchema = z.object({
  orderId: z.string().uuid(),
});

export const querySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(190),
  phone: z.string().trim().max(20).optional().default(""),
  subject: z.string().trim().min(3, "Please enter a subject").max(200),
  message: z.string().trim().min(10, "Please write a message of at least 10 characters").max(3000),
});

export const reviewSchema = z.object({
  productId: z.string().uuid().or(z.string().min(1)),
  name: z.string().trim().min(2).max(100),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().min(2).max(150),
  comment: z.string().trim().min(5).max(2000),
});

export const shopSearchParamsSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  sort: z
    .enum(["newest", "price-asc", "price-desc", "featured"])
    .default("featured"),
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
});

export const productCreateBaseSchema = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens")
    .min(2)
    .max(200),
  brandId: z.string().uuid().or(z.string().min(1)).nullable().optional(),
  categoryId: z.string().uuid().or(z.string().min(1)).nullable().optional(),
  sku: z.string().trim().max(50).optional().default(""),
  shortDescription: z.string().trim().max(500).optional().default(""),
  description: z.string().trim().max(10000).optional().default(""),
  price: z.coerce.number().min(0, { message: "Price must not be negative" }),
  salePrice: z.coerce.number().min(0).nullable().optional(),
  stockQuantity: z.coerce.number().int().min(0).default(0),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  seoTitle: z.string().trim().max(200).optional().default(""),
  seoDescription: z.string().trim().max(300).optional().default(""),
});