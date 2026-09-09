import type { OrderStatus, QueryStatus, ReviewStatus } from "@/types";

export interface DemoOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface DemoOrder {
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
  items: DemoOrderItem[];
}

export interface DemoQuery {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: QueryStatus;
  created_at: string;
}

export interface DemoCustomer {
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

const item = (
  id: string,
  orderId: string,
  productId: string,
  productName: string,
  productImage: string | null,
  unitPrice: number,
  quantity: number,
): DemoOrderItem => ({
  id,
  order_id: orderId,
  product_id: productId,
  product_name: productName,
  product_image: productImage,
  unit_price: unitPrice,
  quantity,
  line_total: unitPrice * quantity,
});

const FW = "prod-face-wash";
const VIT = "prod-vitc-serum";
const OIL = "prod-hair-oil";
const SUN = "prod-sunscreen";
const SHAM = "prod-herbal-shampoo";
const NIA = "prod-niacinamide";
const HSER = "prod-hair-serum";
const CLE = "prod-cleanser";

export const demoOrders: DemoOrder[] = [
  {
    id: "ord-a1b2c3d4",
    order_number: "SSL-20260908-8001",
    customer_name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 331 1234567",
    address: "House 14, Block B, Gulshan-e-Iqbal",
    city: "Karachi",
    notes: "Please deliver after 5pm on weekdays.",
    subtotal: 4697,
    delivery_fee: 0,
    grand_total: 4697,
    status: "PENDING",
    admin_note: null,
    coupon_code: null,
    coupon_discount: 0,
    created_at: "2026-09-08T10:24:00Z",
    items: [
      item("oi-1", "ord-a1b2c3d4", FW, "Anti-Acne Face Wash", null, 1499, 2),
      item("oi-2", "ord-a1b2c3d4", NIA, "Niacinamide 10% Serum", null, 1699, 1),
    ],
  },
  {
    id: "ord-b2c3d4e5",
    order_number: "SSL-20260907-8002",
    customer_name: "Zainab Raza",
    email: "zainab@example.com",
    phone: "+92 300 4455667",
    address: "Street 5, Askari 14",
    city: "Lahore",
    notes: null,
    subtotal: 3198,
    delivery_fee: 0,
    grand_total: 3198,
    status: "APPROVED",
    admin_note: "Call customer to confirm quantities.",
    coupon_code: null,
    coupon_discount: 0,
    created_at: "2026-09-07T16:02:00Z",
    items: [item("oi-3", "ord-b2c3d4e5", OIL, "Herbal Hair Oil", null, 1599, 2)],
  },
  {
    id: "ord-c3d4e5f6",
    order_number: "SSL-20260906-8003",
    customer_name: "Dr. Tariq Kamal",
    email: "tariq@example.com",
    phone: "+92 321 7788990",
    address: "Office 22, Blue Area",
    city: "Islamabad",
    notes: null,
    subtotal: 2898,
    delivery_fee: 200,
    grand_total: 3098,
    status: "SHIPPED",
    admin_note: "Shipped via Leopards, tracking shared on WhatsApp.",
    coupon_code: "WELCOME10",
    coupon_discount: 0,
    created_at: "2026-09-06T11:40:00Z",
    items: [
      item("oi-4", "ord-c3d4e5f6", FW, "Anti-Acne Face Wash", null, 1499, 1),
      item("oi-5", "ord-c3d4e5f6", CLE, "Gentle Hydrating Cleanser", null, 1399, 1),
    ],
  },
  {
    id: "ord-d4e5f6a7",
    order_number: "SSL-20260903-8004",
    customer_name: "Noor Zainab",
    email: "noor@example.com",
    phone: "+92 311 2233445",
    address: "House 4-B, Phase 5, DHA",
    city: "Karachi",
    notes: null,
    subtotal: 3649,
    delivery_fee: 0,
    grand_total: 3649,
    status: "DELIVERED",
    admin_note: "Delivered and confirmed by customer.",
    coupon_code: null,
    coupon_discount: 0,
    created_at: "2026-09-03T09:15:00Z",
    items: [
      item("oi-6", "ord-d4e5f6a7", VIT, "Vitamin C Brightening Serum", null, 1799, 1),
      item("oi-7", "ord-d4e5f6a7", HSER, "Nourishing Hair Serum", null, 1850, 1),
    ],
  },
  {
    id: "ord-demo-user",
    order_number: "SSL-20260908-9001",
    customer_name: "SilkSoul Demo User",
    email: "user@silksoul.com",
    phone: "+92 300 1112233",
    address: "Demo House, Model Town",
    city: "Lahore",
    notes: "Sample order for the demo account.",
    subtotal: 2998,
    delivery_fee: 0,
    grand_total: 2998,
    status: "APPROVED",
    admin_note: null,
    coupon_code: null,
    coupon_discount: 0,
    created_at: "2026-09-08T13:05:00Z",
    items: [
      item("oi-8", "ord-demo-user", FW, "Anti-Acne Face Wash", null, 1499, 2),
    ],
  },
];

export const demoQueries: DemoQuery[] = [
  {
    id: "q-1",
    name: "Zainab Raza",
    email: "zainab@example.com",
    phone: "+92 300 4455667",
    subject: "My order status",
    message:
      "Assalam o Alaikum, I placed order SSL-20260907-8002 yesterday. Could you share an update on when it will dispatch?",
    status: "NEW",
    created_at: "2026-09-09T09:30:00Z",
  },
  {
    id: "q-2",
    name: "Areeba Malik",
    email: "areeba@example.com",
    phone: null,
    subject: "Is the Vitamin C serum pregnancy-safe?",
    message:
      "I love the Niacinamide serum and wanted to know if the 15% Vitamin C serum is safe to use while pregnant. Please advise.",
    status: "NEW",
    created_at: "2026-09-09T08:12:00Z",
  },
  {
    id: "q-3",
    name: "Hamza Sheikh",
    email: "hamza@beautystore.pk",
    phone: "+92 333 9012345",
    subject: "Wholesale inquiry",
    message:
      "We run a chain of beauty stores in Punjab and are interested in stocking the Clearix line. Please share your wholesale price list.",
    status: "IN_PROGRESS",
    created_at: "2026-09-08T14:45:00Z",
  },
  {
    id: "q-4",
    name: "Mahira Shah",
    email: "mahira@example.com",
    phone: "+92 345 1122334",
    subject: "Product recommendations",
    message: "I have combination skin with occasional breakouts. Which Clearix routine would you recommend?",
    status: "RESOLVED",
    created_at: "2026-09-06T18:20:00Z",
  },
  {
    id: "q-5",
    name: "SilkSoul Demo User",
    email: "user@silksoul.com",
    phone: "+92 300 1112233",
    subject: "Refund policy",
    message:
      "Hi, could you confirm the return window for unopened products? I'd like to know before ordering another bottle.",
    status: "RESOLVED",
    created_at: "2026-09-07T11:40:00Z",
  },
];

export const demoCustomers: DemoCustomer[] = [
  {
    id: "cust-1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 331 1234567",
    city: "Karachi",
    status: "ACTIVE",
    total_orders: 1,
    total_spent: 4697,
    last_order_at: "2026-09-08T10:24:00Z",
    created_at: "2026-09-08T10:24:00Z",
  },
  {
    id: "cust-2",
    name: "Zainab Raza",
    email: "zainab@example.com",
    phone: "+92 300 4455667",
    city: "Lahore",
    status: "ACTIVE",
    total_orders: 2,
    total_spent: 4797,
    last_order_at: "2026-09-07T16:02:00Z",
    created_at: "2026-08-20T12:00:00Z",
  },
  {
    id: "cust-3",
    name: "Noor Zainab",
    email: "noor@example.com",
    phone: "+92 311 2233445",
    city: "Karachi",
    status: "ACTIVE",
    total_orders: 3,
    total_spent: 10247,
    last_order_at: "2026-09-03T09:15:00Z",
    created_at: "2026-07-15T15:30:00Z",
  },
  {
    id: "cust-4",
    name: "SilkSoul Demo User",
    email: "user@silksoul.com",
    phone: "+92 300 1112233",
    city: "Lahore",
    status: "ACTIVE",
    total_orders: 1,
    total_spent: 2998,
    last_order_at: "2026-09-08T13:05:00Z",
    created_at: "2026-08-01T09:00:00Z",
  },
];

export const demoReviews: {
  id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  rating: number;
  title: string | null;
  comment: string;
  status: ReviewStatus;
  created_at: string;
}[] = [
  {
    id: "rev-pending-1",
    product_id: FW,
    product_name: "Anti-Acne Face Wash",
    customer_name: "Fatima Jilani",
    rating: 4,
    title: "Works well, slight drying",
    comment: "Breakouts cleared up nicely. Skin felt a little tight so I follow up with moisturizer.",
    status: "PENDING",
    created_at: "2026-09-08T20:10:00Z",
  },
  {
    id: "rev-pending-2",
    product_id: NIA,
    product_name: "Niacinamide 10% Serum",
    customer_name: "Bilal Ahmed",
    rating: 5,
    title: "Great for oily skin",
    comment: "Controls oil much better than expected. Pores look smaller after three weeks.",
    status: "PENDING",
    created_at: "2026-09-07T13:55:00Z",
  },
  {
    id: "rev-demo-user",
    product_id: FW,
    product_name: "Anti-Acne Face Wash",
    customer_name: "user@silksoul.com",
    rating: 5,
    title: "My go-to cleanser",
    comment: "Second order of the same product. Clears breakouts without over-drying.",
    status: "APPROVED",
    created_at: "2026-09-02T17:20:00Z",
  },
];