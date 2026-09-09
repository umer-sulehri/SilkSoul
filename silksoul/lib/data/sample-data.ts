import type { Brand, Category, Collection, Product, ProductImage, ProductWithRelations, Review } from "@/types";

const img = (path: string) =>
  `https://lh3.googleusercontent.com/aida-public/${path}`;

export const IMAGES = {
  sale: {
    faceWash:
      img(
        "AB6AXuBLPbEymLUeEhnbqco031tPKWwkbt038pDBy65bU3EWXzoNJFQRJcSBuOA5AB1k62oXgLWdjktN-SPpLqc9Ld98eQfp4zuMRPvtA5Vr5OMiOq9MXx11IMndalIHz_4UYPb_dqptdMjc4JfpPwv2eGiItwaxE2AT2wx9KBrfliHfh6Om-HlRnAih74f4cE8rZ_I00VSZlm00g5nVGgby9VQAMwB9p0Eai6Ay42roZxJzvJPA3xEEVhRTMw",
      ),
    vitCSerum:
      img(
        "AB6AXuD_se7gYhGAKUEcdSWBJ-GEB9c005nF4zZxzcHw3XBP_FC180sADW127AcQSopsGPv5GTw4vhg_2V4VeCqxti0cbOOddX2kXx1a0xwwrJ-VnuQ879YJf-JFoeUFihv2sBvchcr3pkD9rIQfLIsZaUbFPwAR2ffSEp3ArEQngVxV5YpDGofO4yWQ84daI0tLYuJy92db-t8WNw1aQE3dEAYvQyGfTHuiNsL_uuEzwYOacOoI6Grkx9tynA",
      ),
    hairOil:
      img(
        "AB6AXuAybV3t-qsYWC_b85pjm4aJloRqWfWXQHOMR7AxmN5E9emiDlWoMkdC50U5TBcrzl2ua8548YRgs-uR6pm8RkuYFMUY4pjEydr9qF5joIKANd4KK1VUBL3LzKgHGLsNN9yrtPNaoCRhgDggsw7QodAZHbVhsOj5H2krqWF7UHBkKT3BiC4AT5PiFO8QyFXUdQvXWVjA_2pO5pCsgBmgW4jrdqEi7VhtTxnopH7yBFiFrAhsywdJFLA3_Q",
      ),
    sunscreen:
      img(
        "AB6AXuAhQg6P5CiEyo1ztapGc39Jsv8wKxn84bL-zhgtTSaqpBSXYtltaIR2cA31f6eghOXFMpqaUYS85GEdeav2QrZwhvQFxj2C04V6A1Ww2uGY8iQFp9hlHhShlI4Q2zVWoxkzz3O74kezVle5x7lSPa5d1gJaLAN08CXfCTmUuEx5wunV49dCie9NIZpDr-eEItuotqJtRutTYy6en79VS9TH-Rg6YOqTJTVijoTXfx1uXGg17_cyuvgYjg",
      ),
    herbalShampoo:
      img(
        "AB6AXuCTuK2dxyG8OFbC4Iv31boHG5XTGYDjYOZtBKbY1-HRtxbTht2KJ3AvxkdJvjFw8CDX9K01GQyqvle94gTD54lyCNpwWW7gbr4Wtxpe1-_LDDwXz5RvHHRYsObooeb_I_ralSrdj-9IKe7BW1nzx1wqdY6GtYz8S0uQNdbJFk_WBRPyTRmwuHNmlz61AT_T_FsDU7_5ulWYAuBKZwXDv-trbaMLWZKyQkSuJyAPFZs4iQxXodhK9c4VXQ",
      ),
    niacinamide:
      img(
        "AB6AXuCTUNhbucN7QnwBntSvoZP1fqQsoh0znglIRwAsDmJ82DiYIX8tb9rkmPBgBj2LKuVG7l6gtzp_xT9Vh5J89h6G9zqGVU6dHIN0KYZ8L9Blt86d3fowl5LxP4AOM0fbDY7w2QuARuD_ob-kBuyBgpT1M7Mt9SHaoSE1y25SoKgPCwT87gVSRHKvmV1frTNi55RbX9Vn38sHKx5uMXMfdSaHqbOR_dnrqXsdhm7B-NyHrezzvyrngSZcRw",
      ),
    hairSerum:
      img(
        "AB6AXuBHr3fZkMSUJbt5Nl8FUOqn3fJQsjYi-mf1_6IZnTmeVrUmzxm3QfP0FeKKR5vE5tn-7B6PSHXOXxdCbEsXJIFpmwnIVdlJaKeTRIp7aWM6bDYC_Ph3pfKkOIsimw5-T_-6T8STx7uRWTVpmMX46BL6wDax4bFVJ78oQyu44_y4hJw3xn84QPef98FPsf2HJmtBus6iV1liMsILpfobqEJj1sOJTOBOmOhZP_rjgi38VHalU0ADjLIt8A",
      ),
    cleanser:
      img(
        "AB6AXuCQ-UESO5yAk6wHe9b0uK-QCym_4IA6Vj1R57XJTqlCLeKmWPn-4Z0WjQermT2SWosfiuc1G7Kxc0HY92RWiwoUpwU7fnoZy0QQkZiTHbyr67PQ0QdLp-oADALxcWXjLsxEZNxRbFEqrH7JGJv859AMUCfVl-nJUxpIafalhyrD5xOBN4ajAFlb38LiP0GvXK9u65ARjWPaiky76HBP4YkzWCzYOiv8WkE89ahwOCowww0gE84rtsugnQ",
      ),
  },
  faceWashGallery: [
    img(
      "AB6AXuC9RHNrGgTMgpBH8XETT98mQ7lkspbUxmWq0BPd34jNm0zgD0G0gEEm-tT9jwT4Mbxt13_E5uNPM604T-82EXJxQ372wL5N15AfqtS6WG4s3yGCltrYzujVFHWlKunUg9tTLmBqW7doMIQCBRGMIvtUBB-qvkjGEphOx6i8M8sOKFGt1mdKXj95szae1hEJaOLGhbBxMJFOkwmYmlUDnf-5qdq4zWuVXJ1CEFJYA-XlJfRD8Rendqg0ag",
    ),
    img(
      "AB6AXuDWVOGe3NufDPGJnlwxkGmnDM8Zc-gTiEic2hCcVIGUBoiBJEitH-gmrC6JevX368hrsxp2vgiCVt1ZM3wvYQBr7uhELad891yKBVO1HUv9hMxwPx1I27H4AT7EVTX8OBA4Mfxyp3LMTqJ8ceVGOquMEXKhnvtc-TzerU0bx3X1e_J-hsQsuxdl__OU31DNvqKKaKKImHgxLLXD-DoeUuwiA5cNLCOk4qv9jrfOl8rVIMTv-Gt_k4leqQ",
    ),
    img(
      "AB6AXuCOgTIqli-948w1zR3JwbVSJgk1oRRXcgLlPXlOUHyPlJk8pUu4UyUBcggAM9OqNotZVV64j1s-pYrKj6HT934JRCCQCOc6VqdmfMYnEwZmKhhZuR_JIqpNHzXEz-bIqZU-WJc8P0o2zsjcrSLgMCwnoO7EgCxQGfbeoccjJdLtNa5Gs81ltodUiS0pju8RRn6Ivf2s-eYmj1PqyOeJCFpjxKTdr0WfC-OsdrxM2G__pfsmgJ6pra_jiw",
    ),
    img(
      "AB6AXuA_PiTOFJednHLQzFppjqkKMhKDdIIq1xEMo8G0UCXLkfMHzKqYmnIGk-f3zzz9xpIZJ9DoI0BT_NXOvXq91Sf9HxEyhNVYiT3qL9hDMQ5niQ-XK4GWa4_lGmEY0CPKa4xrJW52ZHLnZ-pqhXQVO9MFQgVbE61KsiZDXtw4_W_oquwAIPiL2TBfquuc-4LQcp1lpz0o0o0u-3SMND2pYOjvvU_XCUVHhKO5pbxnJvbPAxyIKvDNO5wlUg",
    ),
  ],
  categories: {
    skincare: img(
      "AB6AXuBCmXJQ53lfn60cGwR_IQSEMeZVytXiIYfmPIXVUufGwMsxIQkPxr9ebANd-lkPfsEVJbnBl0xSKg4h5zKjWRk_Hy-sdlZW9qZIiwmnE5turlQL4Zi__n65z1UK38v_rENINWpKZSIG0hdTNGBIy0xC1Xk3o1Uv7MHDRxuZG-lcToVunhKvuR4n9cwJ6VgYUvWklivMGSuTb6dl9wxYAafoZY-AYB5Izu1hvm7x5I4xgSfndEj8EYBaFg",
    ),
    haircare: img(
      "AB6AXuDi-eq2POKTwSAG5LMFKhlf5YQ_43-9GhXo_6UiNMLIL9c2Hd2ab0PVgYsdWN3kKTx2IZgck3HThY8hKlxV8n4ZEX6JZv-v8_gHabJqsnya6Xn5XJhD7MRS6uRiy2m2ZGiOZoEPunhz30gmXNey8goc-Zx2Pl80Z7lKEBs4dOLeCJWrXrUQxM2-D3WenXbljYChnCdmrVqu4dUinrEwjDK_eJ5Pb21NzyY18LcNR_vlxf-UQE6L9zFGtg",
    ),
    herbal: img(
      "AB6AXuDO10fow-h57lcDu_HN9f-63O87vOiZ7zIlh0-wLrcmxtCvFmyydbDioX0eXVTJUmDHSe6V8HFdviU3OOcolc7u6iaXS7yaAOOG92GgF9TNh_ZfLe3s89ViwGVZulywiHhBVzY_pW3jzIN37vT6_aBR9vmLTm01RElcNuAun-kteV1LmheVrB8RwvVLkM7E1yU4vRM8LNzOfZjg_SR0Zf7pD8EN38SfiNQMC_TlLaRBuGJZr6AWa9sfvA",
    ),
    body: img(
      "AB6AXuBBQ_SFj9-THeHmZbNRPSUY--VWGkh3jvfc3aP66cJV0aylG4hJR_DTVRJL802nMhKjAfJ0KMnQj0jCh8QZ_5zB7Mg0ZefwcvXg3Mja4gkD6cFaIE3a8-rM0bOK0EzRXizH69ZWMPBn7glzihT2atBADyYfwNaf9jDsYfW7mSQsWLVoN0c68pOAlRtjS0p22660sQmYbwBWg3I91gVnr7ZooICLH14ld4pF4Ug4SGCIzhnwFmXUABD_GA",
    ),
    wellness: img(
      "AB6AXuAVQJ55rPe2CZ25wYsvh_CQmJroqSi3_G_jqGM-n54A-tdj4wEkbkLH3ECxZo6nNRrpWy-Q76dBtZ3M00BRw9tWB8S2gljLnKqjxDpjM0aQeXsV4OPL6wk4UgkI3TjTRx6bf4IlaeT4UyTuU-nJi8iTS9PmtDegx6PbXtDP_V85TyHKPgRbK5fIcJmXImYuVcx7wf5BAEuHo39E6Cpkn4buPzl6pkLN5YjGrdnV1cmirqkZs3TXKyOm5A",
    ),
  },
  heroPortrait:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD2YzM0kMCt6N-Z_Smo1e3kJbPprq2jyAUY3CtFP_nQ6wzU3XTb5BT-GQS1jQvE5SBgraF1-tflVwunSPPhv4CB6jsjMa6Z1VTUyGRYWKTmt2buw4oK3igbjt-a2OlgiJZNa4xcDH8Rw3-fXABtYaxugc1XOpv-aORv8ADaxt7waVVD5EcoXc1MrpW_TyCb4CvY4btbMsFdt2bHJ-mChrhVFfsYY0g2aGwVaHNzRTGZBqE2CMG92cAX_g",
  wellnessStill: img(
    "AB6AXuCYu58Nvd6fWEK2x2d0i62NwN8pd7WOjonstHAsFcEG-jo0I544CVuWSWrPILP1eYObHWsu7FHweduL5MzzvzOMHJY_9AcDHbcBOklyGfuSBFMe0USahb1ZbAstiPSTHtnW34tLEOwM6Y7jWu9aVnULc216B3R4PLPvzoF6EyIm7ZbbJZ5nzOuAaHp9ACdks-ztqPDfZ49gS58NgzLofD5HdXnmN4GvcUw_98Y7ZU93sl-iEYmndqXvQA",
  ),
};

const now = "2026-09-08T10:00:00.000Z";

const brands: Brand[] = [
  {
    id: "brand-clearix",
    name: "Clearix",
    slug: "clearix",
    logo_url: null,
    description:
      "Clinical dermatological care formulated for clear, balanced skin.",
    banner_url: null,
    status: "ACTIVE",
    seo_title: "Clearix — Clinical Skincare",
    seo_description: "Dermatologist-backed formulations for clear, healthy skin.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "brand-silksoul",
    name: "SilkSoul",
    slug: "silksoul",
    logo_url: null,
    description:
      "Botanical and herbal wellness rituals crafted with natural ingredients.",
    banner_url: null,
    status: "ACTIVE",
    seo_title: "SilkSoul — Herbal & Wellness",
    seo_description: "Thoughtfully selected herbal care and wellness essentials.",
    created_at: now,
    updated_at: now,
  },
];

const categories: Category[] = [
  {
    id: "cat-skincare",
    name: "Skincare",
    slug: "skincare",
    description: "Cleansers, serums, sunscreens and treatments for radiant skin.",
    image_url: IMAGES.categories.skincare,
    parent_id: null,
    status: "ACTIVE",
    sort_order: 1,
    created_at: now,
    updated_at: now,
    product_count: 4,
  },
  {
    id: "cat-haircare",
    name: "Hair Care",
    slug: "hair-care",
    description: "Shampoos, oils and serums for healthy hair and scalp.",
    image_url: IMAGES.categories.haircare,
    parent_id: null,
    status: "ACTIVE",
    sort_order: 2,
    created_at: now,
    updated_at: now,
    product_count: 2,
  },
  {
    id: "cat-herbal",
    name: "Herbal Care",
    slug: "herbal-care",
    description: "Time-honoured herbal oils and natural treatments.",
    image_url: IMAGES.categories.herbal,
    parent_id: null,
    status: "ACTIVE",
    sort_order: 3,
    created_at: now,
    updated_at: now,
    product_count: 2,
  },
  {
    id: "cat-body",
    name: "Body Care",
    slug: "body-care",
    description: "Nourishing body washes, oils and lotions.",
    image_url: IMAGES.categories.body,
    parent_id: null,
    status: "ACTIVE",
    sort_order: 4,
    created_at: now,
    updated_at: now,
    product_count: 1,
  },
  {
    id: "cat-wellness",
    name: "Wellness",
    slug: "wellness",
    description: "Mindful tools and essentials for everyday wellbeing.",
    image_url: IMAGES.categories.wellness,
    parent_id: null,
    status: "ACTIVE",
    sort_order: 5,
    created_at: now,
    updated_at: now,
    product_count: 1,
  },
];

const collections: Collection[] = [
  {
    id: "col-best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "The rituals our customers love the most.",
    image_url: null,
    status: "ACTIVE",
    featured: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "col-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Discover the latest additions to your routine.",
    image_url: null,
    status: "ACTIVE",
    featured: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "col-acne-care",
    name: "Acne Care",
    slug: "acne-care",
    description: "Targeted solutions for acne and breakouts.",
    image_url: null,
    status: "ACTIVE",
    featured: false,
    created_at: now,
    updated_at: now,
  },
];

const baseProducts: Omit<Product, "status" | "benefits" | "ingredients" | "how_to_use" | "suitable_for" | "specifications" | "faqs" | "tags" | "images">[] = [
  {
    id: "prod-face-wash",
    name: "Anti-Acne Face Wash",
    slug: "anti-acne-face-wash",
    brand_id: "brand-clearix",
    category_id: "cat-skincare",
    subcategory_id: null,
    sku: "CLX-FW-150",
    short_description:
      "Daily clinical balancing wash with 2% Salicylic Acid & Zinc PCA.",
    description:
      "A gentle yet potent clinical clarifying cleanser formulated with 2% Encapsulated Salicylic Acid, Zinc PCA, and calming botanical extracts to purge pores, regulate excess sebum, and soothe inflammation without stripping your natural moisture barrier.",
    price: 1499,
    sale_price: null,
    stock_quantity: 42,
    low_stock_threshold: 5,
    featured: true,
    best_seller: true,
    new_arrival: false,
    seo_title: "Clearix Anti-Acne Face Wash — Salicylic Acid 2%",
    seo_description: "Clear acne and excess oil with the Clearix Anti-Acne Face Wash.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-vitc-serum",
    name: "Vitamin C Brightening Serum",
    slug: "vitamin-c-brightening-serum",
    brand_id: "brand-clearix",
    category_id: "cat-skincare",
    subcategory_id: null,
    sku: "CLX-VC-30",
    short_description: "15% Vitamin C serum for bright, even-toned skin.",
    description:
      "A stabilized 15% Vitamin C serum with ferulic acid and hyaluronic acid to brighten dull skin, fade dark spots, and defend against environmental stress.",
    price: 1799,
    sale_price: null,
    stock_quantity: 28,
    low_stock_threshold: 5,
    featured: true,
    best_seller: false,
    new_arrival: true,
    seo_title: "Clearix Vitamin C Brightening Serum 15%",
    seo_description: "Brighten and even your skin tone with Clearix Vitamin C serum.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-hair-oil",
    name: "Herbal Hair Oil",
    slug: "herbal-hair-oil",
    brand_id: "brand-silksoul",
    category_id: "cat-herbal",
    subcategory_id: null,
    sku: "SSL-HO-200",
    short_description: "Rosemary, Bhringraj & almond cold-pressed hair oil.",
    description:
      "A traditional herbal hair oil with the comfort of scalp oiling and zero heavy mineral residue. Rosemary, bhringraj and almond work together to nourish roots and restore hair density.",
    price: 1599,
    sale_price: null,
    stock_quantity: 35,
    low_stock_threshold: 5,
    featured: true,
    best_seller: true,
    new_arrival: false,
    seo_title: "SilkSoul Herbal Hair Oil — Rosemary & Bhringraj",
    seo_description: "Nourish your scalp and restore hair density with herbal hair oil.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-sunscreen",
    name: "Tinted Sunscreen SPF 50+",
    slug: "tinted-sunscreen-spf-50",
    brand_id: "brand-clearix",
    category_id: "cat-skincare",
    subcategory_id: null,
    sku: "CLX-SS-50",
    short_description: "Broad spectrum mineral tinted sun protection.",
    description:
      "A silky tinted mineral sunscreen with SPF 50+ broad spectrum protection that blends into skin for a natural, even finish without white cast.",
    price: 1650,
    sale_price: null,
    stock_quantity: 19,
    low_stock_threshold: 5,
    featured: true,
    best_seller: false,
    new_arrival: true,
    seo_title: "Clearix Tinted Sunscreen SPF 50+",
    seo_description: "Broad spectrum tinted mineral sunscreen in a natural finish.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-herbal-shampoo",
    name: "Herbal Shampoo",
    slug: "herbal-shampoo",
    brand_id: "brand-silksoul",
    category_id: "cat-haircare",
    subcategory_id: null,
    sku: "SSL-SH-250",
    short_description: "Gentle scalp rebalancing wash with rosemary & green tea.",
    description:
      "A sulphate-free herbal shampoo that gently rebalances the scalp with rosemary and green tea extracts for soft, healthy hair.",
    price: 1450,
    sale_price: null,
    stock_quantity: 24,
    low_stock_threshold: 5,
    featured: false,
    best_seller: false,
    new_arrival: true,
    seo_title: "SilkSoul Herbal Shampoo — Sulphate-Free",
    seo_description: "Gentle herbal shampoo for scalp rebalancing and healthy hair.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-niacinamide",
    name: "Niacinamide 10% Serum",
    slug: "niacinamide-10-serum",
    brand_id: "brand-clearix",
    category_id: "cat-skincare",
    subcategory_id: null,
    sku: "CLX-NIA-30",
    short_description: "Pore refining serum with Niacinamide 10% & Zinc 1%.",
    description:
      "A pore refining serum with 10% Niacinamide and 1% Zinc to reduce the appearance of pores, control oil, and even skin tone.",
    price: 1699,
    sale_price: null,
    stock_quantity: 7,
    low_stock_threshold: 5,
    featured: false,
    best_seller: false,
    new_arrival: false,
    seo_title: "Clearix Niacinamide 10% Serum with Zinc",
    seo_description: "Refine pores and control oil with Niacinamide 10% serum.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-hair-serum",
    name: "Nourishing Hair Serum",
    slug: "nourishing-hair-serum",
    brand_id: "brand-silksoul",
    category_id: "cat-haircare",
    subcategory_id: null,
    sku: "SSL-HS-60",
    short_description: "Keratin peptides & jojoba for sleek, nourished hair.",
    description:
      "A weightless hair serum infused with keratin peptides and jojoba oil to tame frizz, boost shine, and nourish dry hair.",
    price: 1850,
    sale_price: null,
    stock_quantity: 16,
    low_stock_threshold: 5,
    featured: false,
    best_seller: false,
    new_arrival: true,
    seo_title: "SilkSoul Nourishing Hair Serum",
    seo_description: "Tame frizz and nourish dry hair with keratin peptides.",
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-cleanser",
    name: "Gentle Hydrating Cleanser",
    slug: "gentle-hydrating-cleanser",
    brand_id: "brand-clearix",
    category_id: "cat-skincare",
    subcategory_id: null,
    sku: "CLX-GC-150",
    short_description: "Hyaluronic acid & ceramides balancing cleanser.",
    description:
      "A creamy low-foam cleanser with hyaluronic acid and ceramides that removes impurities while keeping skin soft and hydrated.",
    price: 1399,
    sale_price: null,
    stock_quantity: 0,
    low_stock_threshold: 5,
    featured: false,
    best_seller: false,
    new_arrival: false,
    seo_title: "Clearix Gentle Hydrating Cleanser",
    seo_description: "Hydrating cleanser with hyaluronic acid and ceramides.",
    created_at: now,
    updated_at: now,
  },
];

const productDetails: Record<
  string,
  {
    benefits: string[];
    ingredients: string[];
    how_to_use: string;
    suitable_for: string[];
    specifications: { key: string; value: string }[];
    faqs: { question: string; answer: string }[];
  }
> = {
  "prod-face-wash": {
    benefits: [
      "Helps cleanse and clarify the skin",
      "Helps control excess oil and shine",
      "Targets acne and breakouts",
      "Suitable for daily use",
    ],
    ingredients: [
      "Water (Aqua)",
      "Salicylic Acid 2%",
      "Zinc PCA",
      "Green Tea Leaf Extract",
      "Centella Asiatica",
      "Panthenol (Pro-Vitamin B5)",
      "Niacinamide",
      "Tea Tree Leaf Water",
    ],
    how_to_use:
      "Dispense 1 pump into clean, damp palms. Add lukewarm water and work into a soft lather. Massage gently using upward circular motions for 60 seconds, focusing on the T-zone, then rinse thoroughly with cool water. Use morning and night.",
    suitable_for: ["Oily Skin", "Combination Skin", "Acne-Prone Skin"],
    specifications: [
      { key: "Volume", value: "150ml" },
      { key: "Active", value: "2% Salicylic Acid" },
      { key: "Skin Type", value: "Oily, Combination, Acne-Prone" },
      { key: "Product Type", value: "Face Wash" },
    ],
    faqs: [
      {
        question: "Can I use this cleanser both morning and night?",
        answer:
          "Yes. Because the 2% Salicylic Acid is micro-encapsulated and formulated alongside calming botanicals, it is gentle enough for twice-daily cleansing without compromising barrier integrity.",
      },
      {
        question: "Will this product cause purging?",
        answer:
          "For severely congested skin, mild purging may occur during the first 7-10 days as clogged microcomedones reach the surface. This subsides into visibly clarified, smoother skin.",
      },
    ],
  },
  "prod-vitc-serum": {
    benefits: [
      "Brightens dull and uneven skin tone",
      "Helps fade dark spots and pigmentation",
      "Defends against environmental stress",
      "Improves skin radiance",
    ],
    ingredients: [
      "Ethyl Ascorbic Acid 15%",
      "Ferulic Acid",
      "Hyaluronic Acid",
      "Vitamin E",
      "Glycerin",
    ],
    how_to_use:
      "Apply 3-4 drops to clean, dry skin every morning. Follow with moisturizer and sunscreen. Avoid the eye area.",
    suitable_for: ["Dull Skin", "Uneven Skin Tone", "Hyperpigmentation"],
    specifications: [
      { key: "Volume", value: "30ml" },
      { key: "Active", value: "15% Vitamin C" },
      { key: "Skin Type", value: "All Skin Types" },
      { key: "Product Type", value: "Serum" },
    ],
    faqs: [
      {
        question: "When should I apply Vitamin C?",
        answer:
          "Vitamin C is best applied in the morning under sunscreen for antioxidant protection throughout the day.",
      },
    ],
  },
  "prod-hair-oil": {
    benefits: [
      "Nourishes roots and scalp",
      "Helps reduce hair fall",
      "Adds softness and shine",
      "Traditional herbal comfort",
    ],
    ingredients: [
      "Cold-Pressed Almond Oil",
      "Bhringraj Extract",
      "Rosemary Extract",
      "Amla Extract",
      "Ayurvedic Herbs",
    ],
    how_to_use:
      "Warm a small amount in your palms. Massage gently into scalp in circular motions. Leave for 30-60 minutes or overnight, then shampoo.",
    suitable_for: ["Hair Fall", "Dry Hair", "Dull Hair"],
    specifications: [
      { key: "Volume", value: "200ml" },
      { key: "Texture", value: "Lightweight Oil" },
      { key: "Hair Type", value: "All Hair Types" },
      { key: "Product Type", value: "Hair Oil" },
    ],
    faqs: [
      {
        question: "How often should I oil my hair?",
        answer:
          "For best results, use 2-3 times per week as a pre-wash oiling ritual.",
      },
    ],
  },
  "prod-sunscreen": {
    benefits: [
      "Broad spectrum SPF 50+ protection",
      "Blends into skin naturally",
      "Suitable for daily wear",
      "No white cast",
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide", "Hyaluronic Acid"],
    how_to_use:
      "Apply generously as the last step of your morning routine. Reapply every 2 hours when exposed to sun.",
    suitable_for: ["All Skin Types", "Hyperpigmentation", "Sensitive Skin"],
    specifications: [
      { key: "Volume", value: "50g" },
      { key: "SPF", value: "50+" },
      { key: "Finish", value: "Natural Tinted" },
      { key: "Product Type", value: "Sunscreen" },
    ],
    faqs: [
      {
        question: "Does tinted sunscreen leave a cast?",
        answer:
          "No. The mineral tint blends into a wide range of skin tones for a natural, even finish.",
      },
    ],
  },
  "prod-herbal-shampoo": {
    benefits: [
      "Gently rebalances the scalp",
      "Sulphate-free formula",
      "Leaves hair soft and healthy",
      "Refreshing botanical scent",
    ],
    ingredients: [
      "Rosemary Extract",
      "Green Tea Extract",
      "Amla",
      "Aloe Vera",
      "Coconut-based Cleansers",
    ],
    how_to_use:
      "Massage into wet hair and scalp. Work into a gentle lather, leave for 1 minute, then rinse thoroughly.",
    suitable_for: ["All Hair Types", "Sensitive Scalp", "Daily Use"],
    specifications: [
      { key: "Volume", value: "250ml" },
      { key: "Formula", value: "Sulphate-Free" },
      { key: "Hair Type", value: "All Hair Types" },
      { key: "Product Type", value: "Shampoo" },
    ],
    faqs: [
      {
        question: "Is this shampoo suitable for coloured hair?",
        answer:
          "Yes. The sulphate-free formula is gentle enough for colour-treated hair.",
      },
    ],
  },
  "prod-niacinamide": {
    benefits: [
      "Reduces the appearance of pores",
      "Controls excess oil",
      "Evens skin tone",
      "Improves skin texture",
    ],
    ingredients: ["Niacinamide 10%", "Zinc 1%", "Hyaluronic Acid", "Glycerin"],
    how_to_use:
      "Apply a few drops to clean, dry skin morning and night. Follow with moisturizer.",
    suitable_for: ["Oily Skin", "Combination Skin", "Enlarged Pores"],
    specifications: [
      { key: "Volume", value: "30ml" },
      { key: "Active", value: "10% Niacinamide + 1% Zinc" },
      { key: "Skin Type", value: "Oily, Combination" },
      { key: "Product Type", value: "Serum" },
    ],
    faqs: [
      {
        question: "Can I use Niacinamide with Vitamin C?",
        answer:
          "For most skin types, modern formulations allow layering. Start by patch testing and applying at different times of day.",
      },
    ],
  },
  "prod-hair-serum": {
    benefits: [
      "Tames frizz and flyaways",
      "Adds healthy shine",
      "Nourishes dry hair",
      "Weightless finish",
    ],
    ingredients: ["Keratin Peptides", "Jojoba Oil", "Argan Oil", "Vitamin E"],
    how_to_use:
      "Apply a few drops to damp or dry hair, focusing on mid-lengths and ends. Style as usual.",
    suitable_for: ["Frizzy Hair", "Dry Hair", "Dull Hair"],
    specifications: [
      { key: "Volume", value: "60ml" },
      { key: "Texture", value: "Weightless Fluid" },
      { key: "Hair Type", value: "All Hair Types" },
      { key: "Product Type", value: "Hair Serum" },
    ],
    faqs: [
      {
        question: "Will this serum weigh my hair down?",
        answer:
          "No. The lightweight formula absorbs quickly without leaving residue or heaviness.",
      },
    ],
  },
  "prod-cleanser": {
    benefits: [
      "Removes impurities gently",
      "Hydrates while cleansing",
      "Strengthens the skin barrier",
      "Suitable for sensitive skin",
    ],
    ingredients: ["Hyaluronic Acid", "Ceramides", "Glycerin", "Aloe Vera"],
    how_to_use:
      "Massage onto damp skin in gentle circular motions. Rinse with lukewarm water. Use morning and night.",
    suitable_for: ["Dry Skin", "Sensitive Skin", "Normal Skin"],
    specifications: [
      { key: "Volume", value: "150ml" },
      { key: "Texture", value: "Low-Foam Gel" },
      { key: "Skin Type", value: "Dry, Sensitive" },
      { key: "Product Type", value: "Cleanser" },
    ],
    faqs: [
      {
        question: "Is this cleanser good for removing makeup?",
        answer:
          "It gently removes light makeup and sunscreen. Use a dedicated makeup remover for heavy or waterproof makeup.",
      },
    ],
  },
};

const images: Record<string, { image_url: string; alt_text: string; is_primary: boolean; sort_order: number }[]> = {
  "prod-face-wash": IMAGES.faceWashGallery.map((url, i) => ({
    image_url: url,
    alt_text: i === 0 ? "Clearix Anti-Acne Face Wash" : `Clearix Anti-Acne Face Wash view ${i + 1}`,
    is_primary: i === 0,
    sort_order: i,
  })),
  "prod-vitc-serum": [
    { image_url: IMAGES.sale.vitCSerum, alt_text: "Clearix Vitamin C Brightening Serum", is_primary: true, sort_order: 0 },
  ],
  "prod-hair-oil": [
    { image_url: IMAGES.sale.hairOil, alt_text: "SilkSoul Herbal Hair Oil", is_primary: true, sort_order: 0 },
  ],
  "prod-sunscreen": [
    { image_url: IMAGES.sale.sunscreen, alt_text: "Clearix Tinted Sunscreen SPF 50+", is_primary: true, sort_order: 0 },
  ],
  "prod-herbal-shampoo": [
    { image_url: IMAGES.sale.herbalShampoo, alt_text: "SilkSoul Herbal Shampoo", is_primary: true, sort_order: 0 },
  ],
  "prod-niacinamide": [
    { image_url: IMAGES.sale.niacinamide, alt_text: "Clearix Niacinamide 10% Serum", is_primary: true, sort_order: 0 },
  ],
  "prod-hair-serum": [
    { image_url: IMAGES.sale.hairSerum, alt_text: "SilkSoul Nourishing Hair Serum", is_primary: true, sort_order: 0 },
  ],
  "prod-cleanser": [
    { image_url: IMAGES.sale.cleanser, alt_text: "Clearix Gentle Hydrating Cleanser", is_primary: true, sort_order: 0 },
  ],
};

const collectionProductMap: Record<string, string[]> = {
  "col-best-sellers": ["prod-face-wash", "prod-hair-oil", "prod-vitc-serum", "prod-sunscreen"],
  "col-new-arrivals": ["prod-vitc-serum", "prod-sunscreen", "prod-herbal-shampoo", "prod-hair-serum"],
  "col-acne-care": ["prod-face-wash", "prod-niacinamide", "prod-cleanser"],
};

export const sampleReviews: Review[] = [
  {
    id: "rev-1",
    product_id: "prod-face-wash",
    customer_name: "Sarah M.",
    rating: 5,
    title: "Clear skin without the tight feeling",
    comment:
      "The Clearix Anti-Acne Wash changed my persistent breakouts within three weeks without leaving my skin stripped or tight.",
    status: "APPROVED",
    created_at: now,
  },
  {
    id: "rev-2",
    product_id: "prod-face-wash",
    customer_name: "Dr. Ayesha K.",
    rating: 5,
    title: "Exemplary formulation purity",
    comment:
      "The inclusion of physiological zinc along with microencapsulated BHA provides safe keratolytics for patient maintenance.",
    status: "APPROVED",
    created_at: now,
  },
  {
    id: "rev-3",
    product_id: "prod-face-wash",
    customer_name: "Zainab R.",
    rating: 5,
    title: "Gentle yet effective",
    comment: "Beautiful packaging and the product quality is even better.",
    status: "APPROVED",
    created_at: now,
  },
  {
    id: "rev-4",
    product_id: "prod-vitc-serum",
    customer_name: "Dr. Tariq K.",
    rating: 5,
    title: "Compatible and brightening",
    comment:
      "As a practitioner, I respect the clean stabilization of the 15% Vitamin C. It is both biocompatible and visibly brightening.",
    status: "APPROVED",
    created_at: now,
  },
  {
    id: "rev-5",
    product_id: "prod-vitc-serum",
    customer_name: "Noor Z.",
    rating: 4,
    title: "Great glow",
    comment: "Noticed a visible glow within two weeks of daily morning use.",
    status: "APPROVED",
    created_at: now,
  },
  {
    id: "rev-6",
    product_id: "prod-hair-oil",
    customer_name: "Zainab R.",
    rating: 5,
    title: "Restored hair density",
    comment:
      "The Herbal Hair Oil brings back the traditional comfort of scalp oiling with zero heavy mineral residue.",
    status: "APPROVED",
    created_at: now,
  },
];

export function getSampleProducts(): ProductWithRelations[] {
  return baseProducts.map((p) => {
    const details = productDetails[p.id];
    const allImages: ProductImage[] = (images[p.id] ?? []).map((img, i) => ({
      id: `${p.id}-img-${i}`,
      product_id: p.id,
      image_url: img.image_url,
      alt_text: img.alt_text,
      sort_order: img.sort_order,
      is_primary: img.is_primary,
      created_at: now,
    }));
    const reviews = sampleReviews.filter((r) => r.product_id === p.id && r.status === "APPROVED");
    const rating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    const collectionsOfProduct = Object.entries(collectionProductMap)
      .filter(([, ids]) => ids.includes(p.id))
      .map(([id]) => collections.find((c) => c.id === id)!)
      .filter(Boolean);
    const brand = brands.find((b) => b.id === p.brand_id) ?? null;
    const category = categories.find((c) => c.id === p.category_id) ?? null;
    const subcategory = categories.find((c) => c.id === p.subcategory_id) ?? null;

    return {
      ...p,
      status: "PUBLISHED" as const,
      benefits: details.benefits,
      ingredients: details.ingredients,
      how_to_use: details.how_to_use,
      suitable_for: details.suitable_for,
      specifications: details.specifications,
      faqs: details.faqs,
      tags: [],
      images: allImages,
      collections: collectionsOfProduct,
      brand,
      category,
      subcategory,
      rating: Number(rating.toFixed(1)),
      review_count: reviews.length,
    };
  });
}

export const sampleProducts: ProductWithRelations[] = getSampleProducts();

export const sampleCategories = categories;
export const sampleBrands = brands;
export const sampleCollections = collections;

export const sampleSiteSettings = {
  site_name: "SilkSoul",
  logo: null,
  support_email: "care@silksoul.com",
  support_phone: "+92 300 1234567",
  whatsapp_number: "+92 300 1234567",
  currency: "PKR",
  delivery_message: "Free delivery on orders above Rs. 3,000",
  announcement_bar_enabled: true,
  announcement_bar_text: "Free delivery on orders above Rs. 3,000",
  free_delivery_threshold: 3000,
  standard_delivery_fee: 200,
};