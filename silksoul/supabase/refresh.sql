-- ============================================================
-- SILKSOUL DATABASE REFRESH
-- Wipes all app data and re-seeds (brands, catalog, products,
-- customers, orders, queries, reviews, site settings).
-- auth.users and public.profiles are NOT touched -> your
-- admin login survives.
-- Run ONCE in Supabase SQL Editor (as postgres/owner).
-- ============================================================

truncate table
  public.collection_products,
  public.product_images,
  public.product_tags,
  public.order_items,
  public.orders,
  public.queries,
  public.reviews,
  public.customers,
  public.products,
  public.tags,
  public.brands,
  public.categories,
  public.collections,
  public.site_settings
restart identity cascade;

-- ============ RE-SEED (contents of 0002_seed.sql) ============

-- ============================================================================
-- SILKSOUL SEED DATA
-- ============================================================================
-- Run AFTER 0001_initial_schema.sql. Uses fixed UUIDs so relational inserts
-- are deterministic. Idempotent (uses ON CONFLICT ... DO NOTHING).
-- ============================================================================

insert into public.brands (id, name, slug, description, status, seo_title, seo_description)
values
  ('a0000000-0000-4000-8000-000000000001', 'Clearix', 'clearix',
   'Clinical dermatological care formulated for clear, balanced skin.',
   'ACTIVE', 'Clearix — Clinical Skincare',
   'Dermatologist-backed formulations for clear, healthy skin.'),
  ('a0000000-0000-4000-8000-000000000002', 'SilkSoul', 'silksoul',
   'Botanical and herbal wellness rituals crafted with natural ingredients.',
   'ACTIVE', 'SilkSoul — Herbal & Wellness',
   'Thoughtfully selected herbal care and wellness essentials.')
on conflict (id) do nothing;

insert into public.categories (id, name, slug, description, image_url, parent_id, status, sort_order)
values
  ('a0000000-0000-4000-8000-000000000101', 'Skincare', 'skincare',
   'Cleansers, serums, sunscreens and treatments for radiant skin.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBCmXJQ53lfn60cGwR_IQSEMeZVytXiIYfmPIXVUufGwMsxIQkPxr9ebANd-lkPfsEVJbnBl0xSKg4h5zKjWRk_Hy-sdlZW9qZIiwmnE5turlQL4Zi__n65z1UK38v_rENINWpKZSIG0hdTNGBIy0xC1Xk3o1Uv7MHDRxuZG-lcToVunhKvuR4n9cwJ6VgYUvWklivMGSuTb6dl9wxYAafoZY-AYB5Izu1hvm7x5I4xgSfndEj8EYBaFg',
   null, 'ACTIVE', 1),
  ('a0000000-0000-4000-8000-000000000102', 'Hair Care', 'hair-care',
   'Shampoos, oils and serums for healthy hair and scalp.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDi-eq2POKTwSAG5LMFKhlf5YQ_43-9GhXo_6UiNMLIL9c2Hd2ab0PVgYsdWN3kKTx2IZgck3HThY8hKlxV8n4ZEX6JZv-v8_gHabJqsnya6Xn5XJhD7MRS6uRiy2m2ZGiOZoEPunhz30gmXNey8goc-Zx2Pl80Z7lKEBs4dOLeCJWrXrUQxM2-D3WenXbljYChnCdmrVqu4dUinrEwjDK_eJ5Pb21NzyY18LcNR_vlxf-UQE6L9zFGtg',
   null, 'ACTIVE', 2),
  ('a0000000-0000-4000-8000-000000000103', 'Herbal Care', 'herbal-care',
   'Time-honoured herbal oils and natural treatments.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDO10fow-h57lcDu_HN9f-63O87vOiZ7zIlh0-wLrcmxtCvFmyydbDioX0eXVTJUmDHSe6V8HFdviU3OOcolc7u6iaXS7yaAOOG92GgF9TNh_ZfLe3s89ViwGVZulywiHhBVzY_pW3jzIN37vT6_aBR9vmLTm01RElcNuAun-kteV1LmheVrB8RwvVLkM7E1yU4vRM8LNzOfZjg_SR0Zf7pD8EN38SfiNQMC_TlLaRBuGJZr6AWa9sfvA',
   null, 'ACTIVE', 3),
  ('a0000000-0000-4000-8000-000000000104', 'Body Care', 'body-care',
   'Nourishing body washes, oils and lotions.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBBQ_SFj9-THeHmZbNRPSUY--VWGkh3jvfc3aP66cJV0aylG4hJR_DTVRJL802nMhKjAfJ0KMnQj0jCh8QZ_5zB7Mg0ZefwcvXg3Mja4gkD6cFaIE3a8-rM0bOK0EzRXizH69ZWMPBn7glzihT2atBADyYfwNaf9jDsYfW7mSQsWLVoN0c68pOAlRtjS0p22660sQmYbwBWg3I91gVnr7ZooICLH14ld4pF4Ug4SGCIzhnwFmXUABD_GA',
   null, 'ACTIVE', 4),
  ('a0000000-0000-4000-8000-000000000105', 'Wellness', 'wellness',
   'Mindful tools and essentials for everyday wellbeing.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAVQJ55rPe2CZ25wYsvh_CQmJroqSi3_G_jqGM-n54A-tdj4wEkbkLH3ECxZo6nNRrpWy-Q76dBtZ3M00BRw9tWB8S2gljLnKqjxDpjM0aQeXsV4OPL6wk4UgkI3TjTRx6bf4IlaeT4UyTuU-nJi8iTS9PmtDegx6PbXtDP_V85TyHKPgRbK5fIcJmXImYuVcx7wf5BAEuHo39E6Cpkn4buPzl6pkLN5YjGrdnV1cmirqkZs3TXKyOm5A',
   null, 'ACTIVE', 5)
on conflict (id) do nothing;

insert into public.collections (id, name, slug, description, published)
values
  ('a0000000-0000-4000-8000-000000000201', 'Best Sellers', 'best-sellers',
   'The rituals our customers love the most.', true),
  ('a0000000-0000-4000-8000-000000000202', 'New Arrivals', 'new-arrivals',
   'Discover the latest additions to your routine.', true),
  ('a0000000-0000-4000-8000-000000000203', 'Acne Care', 'acne-care',
   'Targeted solutions for acne and breakouts.', true)
on conflict (id) do nothing;

-- ---- PRODUCTS ----
insert into public.products (
  id, name, slug, brand_id, category_id, sku, short_description, description,
  price, sale_price, stock_quantity, low_stock_threshold, status,
  featured, best_seller, new_arrival, seo_title, seo_description,
  benefits, ingredients, how_to_use, suitable_for, specifications, faqs
)
values
  (
    'c0000000-0000-4000-8000-000000000001', 'Anti-Acne Face Wash', 'anti-acne-face-wash',
    'a0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000101',
    'CLX-FW-150', 'Daily clinical balancing wash with 2% Salicylic Acid & Zinc PCA.',
    'A gentle yet potent clinical clarifying cleanser formulated with 2% Encapsulated Salicylic Acid, Zinc PCA, and calming botanical extracts to purge pores, regulate excess sebum, and soothe inflammation without stripping your natural moisture barrier.',
    1499, null, 42, 5, 'PUBLISHED', true, true, false,
    'Clearix Anti-Acne Face Wash — Salicylic Acid 2%',
    'Clear acne and excess oil with the Clearix Anti-Acne Face Wash.',
    '["Helps cleanse and clarify the skin","Helps control excess oil and shine","Targets acne and breakouts","Suitable for daily use"]',
    '["Water (Aqua)","Salicylic Acid 2%","Zinc PCA","Green Tea Leaf Extract","Centella Asiatica","Panthenol (Pro-Vitamin B5)","Niacinamide","Tea Tree Leaf Water"]',
    'Dispense 1 pump into clean, damp palms. Add lukewarm water and work into a soft lather. Massage gently using upward circular motions for 60 seconds, focusing on the T-zone, then rinse thoroughly with cool water. Use morning and night.',
    '["Oily Skin","Combination Skin","Acne-Prone Skin"]',
    '[{"key":"Volume","value":"150ml"},{"key":"Active","value":"2% Salicylic Acid"},{"key":"Skin Type","value":"Oily, Combination, Acne-Prone"},{"key":"Product Type","value":"Face Wash"}]',
    '[{"question":"Can I use this cleanser both morning and night?","answer":"Yes. Because the 2% Salicylic Acid is micro-encapsulated and formulated alongside calming botanicals, it is gentle enough for twice-daily cleansing without compromising barrier integrity."},{"question":"Will this product cause purging?","answer":"For severely congested skin, mild purging may occur during the first 7-10 days as clogged microcomedones reach the surface. This subsides into visibly clarified, smoother skin."}]'
  ),
  (
    'c0000000-0000-4000-8000-000000000002', 'Vitamin C Brightening Serum', 'vitamin-c-brightening-serum',
    'a0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000101',
    'CLX-VC-30', '15% Vitamin C serum for bright, even-toned skin.',
    'A stabilized 15% Vitamin C serum with ferulic acid and hyaluronic acid to brighten dull skin, fade dark spots, and defend against environmental stress.',
    1799, null, 28, 5, 'PUBLISHED', true, false, true,
    'Clearix Vitamin C Brightening Serum 15%',
    'Brighten and even your skin tone with Clearix Vitamin C serum.',
    '["Brightens dull and uneven skin tone","Helps fade dark spots and pigmentation","Defends against environmental stress","Improves skin radiance"]',
    '["Ethyl Ascorbic Acid 15%","Ferulic Acid","Hyaluronic Acid","Vitamin E","Glycerin"]',
    'Apply 3-4 drops to clean, dry skin every morning. Follow with moisturizer and sunscreen. Avoid the eye area.',
    '["Dull Skin","Uneven Skin Tone","Hyperpigmentation"]',
    '[{"key":"Volume","value":"30ml"},{"key":"Active","value":"15% Vitamin C"},{"key":"Skin Type","value":"All Skin Types"},{"key":"Product Type","value":"Serum"}]',
    '[{"question":"When should I apply Vitamin C?","answer":"Vitamin C is best applied in the morning under sunscreen for antioxidant protection throughout the day."}]'
  ),
  (
    'c0000000-0000-4000-8000-000000000003', 'Herbal Hair Oil', 'herbal-hair-oil',
    'a0000000-0000-4000-8000-000000000002', 'a0000000-0000-4000-8000-000000000103',
    'SSL-HO-200', 'Rosemary, Bhringraj & almond cold-pressed hair oil.',
    'A traditional herbal hair oil with the comfort of scalp oiling and zero heavy mineral residue. Rosemary, bhringraj and almond work together to nourish roots and restore hair density.',
    1599, null, 35, 5, 'PUBLISHED', true, true, false,
    'SilkSoul Herbal Hair Oil — Rosemary & Bhringraj',
    'Nourish your scalp and restore hair density with herbal hair oil.',
    '["Nourishes roots and scalp","Helps reduce hair fall","Adds softness and shine","Traditional herbal comfort"]',
    '["Cold-Pressed Almond Oil","Bhringraj Extract","Rosemary Extract","Amla Extract","Ayurvedic Herbs"]',
    'Warm a small amount in your palms. Massage gently into scalp in circular motions. Leave for 30-60 minutes or overnight, then shampoo.',
    '["Hair Fall","Dry Hair","Dull Hair"]',
    '[{"key":"Volume","value":"200ml"},{"key":"Texture","value":"Lightweight Oil"},{"key":"Hair Type","value":"All Hair Types"},{"key":"Product Type","value":"Hair Oil"}]',
    '[{"question":"How often should I oil my hair?","answer":"For best results, use 2-3 times per week as a pre-wash oiling ritual."}]'
  ),
  (
    'c0000000-0000-4000-8000-000000000004', 'Tinted Sunscreen SPF 50+', 'tinted-sunscreen-spf-50',
    'a0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000101',
    'CLX-SS-50', 'Broad spectrum mineral tinted sun protection.',
    'A silky tinted mineral sunscreen with SPF 50+ broad spectrum protection that blends into skin for a natural, even finish without white cast.',
    1650, null, 19, 5, 'PUBLISHED', true, false, true,
    'Clearix Tinted Sunscreen SPF 50+',
    'Broad spectrum tinted mineral sunscreen in a natural finish.',
    '["Broad spectrum SPF 50+ protection","Blends into skin naturally","Suitable for daily wear","No white cast"]',
    '["Zinc Oxide","Titanium Dioxide","Niacinamide","Hyaluronic Acid"]',
    'Apply generously as the last step of your morning routine. Reapply every 2 hours when exposed to sun.',
    '["All Skin Types","Hyperpigmentation","Sensitive Skin"]',
    '[{"key":"Volume","value":"50g"},{"key":"SPF","value":"50+"},{"key":"Finish","value":"Natural Tinted"},{"key":"Product Type","value":"Sunscreen"}]',
    '[{"question":"Does tinted sunscreen leave a cast?","answer":"No. The mineral tint blends into a wide range of skin tones for a natural, even finish."}]'
  ),
  (
    'c0000000-0000-4000-8000-000000000005', 'Herbal Shampoo', 'herbal-shampoo',
    'a0000000-0000-4000-8000-000000000002', 'a0000000-0000-4000-8000-000000000102',
    'SSL-SH-250', 'Gentle scalp rebalancing wash with rosemary & green tea.',
    'A sulphate-free herbal shampoo that gently rebalances the scalp with rosemary and green tea extracts for soft, healthy hair.',
    1450, null, 24, 5, 'PUBLISHED', false, false, true,
    'SilkSoul Herbal Shampoo — Sulphate-Free',
    'Gentle herbal shampoo for scalp rebalancing and healthy hair.',
    '["Gently rebalances the scalp","Sulphate-free formula","Leaves hair soft and healthy","Refreshing botanical scent"]',
    '["Rosemary Extract","Green Tea Extract","Amla","Aloe Vera","Coconut-based Cleansers"]',
    'Massage into wet hair and scalp. Work into a gentle lather, leave for 1 minute, then rinse thoroughly.',
    '["All Hair Types","Sensitive Scalp","Daily Use"]',
    '[{"key":"Volume","value":"250ml"},{"key":"Formula","value":"Sulphate-Free"},{"key":"Hair Type","value":"All Hair Types"},{"key":"Product Type","value":"Shampoo"}]',
    '[{"question":"Is this shampoo suitable for coloured hair?","answer":"Yes. The sulphate-free formula is gentle enough for colour-treated hair."}]'
  ),
  (
    'c0000000-0000-4000-8000-000000000006', 'Niacinamide 10% Serum', 'niacinamide-10-serum',
    'a0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000101',
    'CLX-NIA-30', 'Pore refining serum with Niacinamide 10% & Zinc 1%.',
    'A pore refining serum with 10% Niacinamide and 1% Zinc to reduce the appearance of pores, control oil, and even skin tone.',
    1699, null, 7, 5, 'PUBLISHED', false, false, false,
    'Clearix Niacinamide 10% Serum with Zinc',
    'Refine pores and control oil with Niacinamide 10% serum.',
    '["Reduces the appearance of pores","Controls excess oil","Evens skin tone","Improves skin texture"]',
    '["Niacinamide 10%","Zinc 1%","Hyaluronic Acid","Glycerin"]',
    'Apply a few drops to clean, dry skin morning and night. Follow with moisturizer.',
    '["Oily Skin","Combination Skin","Enlarged Pores"]',
    '[{"key":"Volume","value":"30ml"},{"key":"Active","value":"10% Niacinamide + 1% Zinc"},{"key":"Skin Type","value":"Oily, Combination"},{"key":"Product Type","value":"Serum"}]',
    '[{"question":"Can I use Niacinamide with Vitamin C?","answer":"For most skin types, modern formulations allow layering. Start by patch testing and applying at different times of day."}]'
  ),
  (
    'c0000000-0000-4000-8000-000000000007', 'Nourishing Hair Serum', 'nourishing-hair-serum',
    'a0000000-0000-4000-8000-000000000002', 'a0000000-0000-4000-8000-000000000102',
    'SSL-HS-60', 'Keratin peptides & jojoba for sleek, nourished hair.',
    'A weightless hair serum infused with keratin peptides and jojoba oil to tame frizz, boost shine, and nourish dry hair.',
    1850, null, 16, 5, 'PUBLISHED', false, false, true,
    'SilkSoul Nourishing Hair Serum',
    'Tame frizz and nourish dry hair with keratin peptides.',
    '["Tames frizz and flyaways","Adds healthy shine","Nourishes dry hair","Weightless finish"]',
    '["Keratin Peptides","Jojoba Oil","Argan Oil","Vitamin E"]',
    'Apply a few drops to damp or dry hair, focusing on mid-lengths and ends. Style as usual.',
    '["Frizzy Hair","Dry Hair","Dull Hair"]',
    '[{"key":"Volume","value":"60ml"},{"key":"Texture","value":"Weightless Fluid"},{"key":"Hair Type","value":"All Hair Types"},{"key":"Product Type","value":"Hair Serum"}]',
    '[{"question":"Will this serum weigh my hair down?","answer":"No. The lightweight formula absorbs quickly without leaving residue or heaviness."}]'
  ),
  (
    'c0000000-0000-4000-8000-000000000008', 'Gentle Hydrating Cleanser', 'gentle-hydrating-cleanser',
    'a0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000101',
    'CLX-GC-150', 'Hyaluronic acid & ceramides balancing cleanser.',
    'A creamy low-foam cleanser with hyaluronic acid and ceramides that removes impurities while keeping skin soft and hydrated.',
    1399, null, 0, 5, 'PUBLISHED', false, false, false,
    'Clearix Gentle Hydrating Cleanser',
    'Hydrating cleanser with hyaluronic acid and ceramides.',
    '["Removes impurities gently","Hydrates while cleansing","Strengthens the skin barrier","Suitable for sensitive skin"]',
    '["Hyaluronic Acid","Ceramides","Glycerin","Aloe Vera"]',
    'Massage onto damp skin in gentle circular motions. Rinse with lukewarm water. Use morning and night.',
    '["Dry Skin","Sensitive Skin","Normal Skin"]',
    '[{"key":"Volume","value":"150ml"},{"key":"Texture","value":"Low-Foam Gel"},{"key":"Skin Type","value":"Dry, Sensitive"},{"key":"Product Type","value":"Cleanser"}]',
    '[{"question":"Is this cleanser good for removing makeup?","answer":"It gently removes light makeup and sunscreen. Use a dedicated makeup remover for heavy or waterproof makeup."}]'
  )
on conflict (id) do nothing;

-- ---- PRODUCT IMAGES ----
insert into public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
values
  ('d0000000-0000-4000-8000-000000000101', 'c0000000-0000-4000-8000-000000000001',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuC9RHNrGgTMgpBH8XETT98mQ7lkspbUxmWq0BPd34jNm0zgD0G0gEEm-tT9jwT4Mbxt13_E5uNPM604T-82EXJxQ372wL5N15AfqtS6WG4s3yGCltrYzujVFHWlKunUg9tTLmBqW7doMIQCBRGMIvtUBB-qvkjGEphOx6i8M8sOKFGt1mdKXj95szae1hEJaOLGhbBxMJFOkwmYmlUDnf-5qdq4zWuVXJ1CEFJYA-XlJfRD8Rendqg0ag',
   'Clearix Anti-Acne Face Wash', 0, true),
  ('d0000000-0000-4000-8000-000000000102', 'c0000000-0000-4000-8000-000000000001',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDWVOGe3NufDPGJnlwxkGmnDM8Zc-gTiEic2hCcVIGUBoiBJEitH-gmrC6JevX368hrsxp2vgiCVt1ZM3wvYQBr7uhELad891yKBVO1HUv9hMxwPx1I27H4AT7EVTX8OBA4Mfxyp3LMTqJ8ceVGOquMEXKhnvtc-TzerU0bx3X1e_J-hsQsuxdl__OU31DNvqKKaKKImHgxLLXD-DoeUuwiA5cNLCOk4qv9jrfOl8rVIMTv-Gt_k4leqQ',
   'Clearix Anti-Acne Face Wash texture', 1, false),
  ('d0000000-0000-4000-8000-000000000103', 'c0000000-0000-4000-8000-000000000001',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCOgTIqli-948w1zR3JwbVSJgk1oRRXcgLlPXlOUHyPlJk8pUu4UyUBcggAM9OqNotZVV64j1s-pYrKj6HT934JRCCQCOc6VqdmfMYnEwZmKhhZuR_JIqpNHzXEz-bIqZU-WJc8P0o2zsjcrSLgMCwnoO7EgCxQGfbeoccjJdLtNa5Gs81ltodUiS0pju8RRn6Ivf2s-eYmj1PqyOeJCFpjxKTdr0WfC-OsdrxM2G__pfsmgJ6pra_jiw',
   'Clearix Anti-Acne Face Wash lather', 2, false),
  ('d0000000-0000-4000-8000-000000000104', 'c0000000-0000-4000-8000-000000000001',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuA_PiTOFJednHLQzFppjqkKMhKDdIIq1xEMo8G0UCXLkfMHzKqYmnIGk-f3zzz9xpIZJ9DoI0BT_NXOvXq91Sf9HxEyhNVYiT3qL9hDMQ5niQ-XK4GWa4_lGmEY0CPKa4xrJW52ZHLnZ-pqhXQVO9MFQgVbE61KsiZDXtw4_W_oquwAIPiL2TBfquuc-4LQcp1lpz0o0o0u-3SMND2pYOjvvU_XCUVHhKO5pbxnJvbPAxyIKvDNO5wlUg',
   'Clearix Anti-Acne Face Wash botanical', 3, false),
  ('d0000000-0000-4000-8000-000000000201', 'c0000000-0000-4000-8000-000000000002',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuD_se7gYhGAKUEcdSWBJ-GEB9c005nF4zZxzcHw3XBP_FC180sADW127AcQSopsGPv5GTw4vhg_2V4VeCqxti0cbOOddX2kXx1a0xwwrJ-VnuQ879YJf-JFoeUFihv2sBvchcr3pkD9rIQfLIsZaUbFPwAR2ffSEp3ArEQngVxV5YpDGofO4yWQ84daI0tLYuJy92db-t8WNw1aQE3dEAYvQyGfTHuiNsL_uuEzwYOacOoI6Grkx9tynA',
   'Clearix Vitamin C Brightening Serum', 0, true),
  ('d0000000-0000-4000-8000-000000000301', 'c0000000-0000-4000-8000-000000000003',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAybV3t-qsYWC_b85pjm4aJloRqWfWXQHOMR7AxmN5E9emiDlWoMkdC50U5TBcrzl2ua8548YRgs-uR6pm8RkuYFMUY4pjEydr9qF5joIKANd4KK1VUBL3LzKgHGLsNN9yrtPNaoCRhgDggsw7QodAZHbVhsOj5H2krqWF7UHBkKT3BiC4AT5PiFO8QyFXUdQvXWVjA_2pO5pCsgBmgW4jrdqEi7VhtTxnopH7yBFiFrAhsywdJFLA3_Q',
   'SilkSoul Herbal Hair Oil', 0, true),
  ('d0000000-0000-4000-8000-000000000401', 'c0000000-0000-4000-8000-000000000004',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAhQg6P5CiEyo1ztapGc39Jsv8wKxn84bL-zhgtTSaqpBSXYtltaIR2cA31f6eghOXFMpqaUYS85GEdeav2QrZwhvQFxj2C04V6A1Ww2uGY8iQFp9hlHhShlI4Q2zVWoxkzz3O74kezVle5x7lSPa5d1gJaLAN08CXfCTmUuEx5wunV49dCie9NIZpDr-eEItuotqJtRutTYy6en79VS9TH-Rg6YOqTJTVijoTXfx1uXGg17_cyuvgYjg',
   'Clearix Tinted Sunscreen SPF 50+', 0, true),
  ('d0000000-0000-4000-8000-000000000501', 'c0000000-0000-4000-8000-000000000005',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCTuK2dxyG8OFbC4Iv31boHG5XTGYDjYOZtBKbY1-HRtxbTht2KJ3AvxkdJvjFw8CDX9K01GQyqvle94gTD54lyCNpwWW7gbr4Wtxpe1-_LDDwXz5RvHHRYsObooeb_I_ralSrdj-9IKe7BW1nzx1wqdY6GtYz8S0uQNdbJFk_WBRPyTRmwuHNmlz61AT_T_FsDU7_5ulWYAuBKZwXDv-trbaMLWZKyQkSuJyAPFZs4iQxXodhK9c4VXQ',
   'SilkSoul Herbal Shampoo', 0, true),
  ('d0000000-0000-4000-8000-000000000601', 'c0000000-0000-4000-8000-000000000006',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCTUNhbucN7QnwBntSvoZP1fqQsoh0znglIRwAsDmJ82DiYIX8tb9rkmPBgBj2LKuVG7l6gtzp_xT9Vh5J89h6G9zqGVU6dHIN0KYZ8L9Blt86d3fowl5LxP4AOM0fbDY7w2QuARuD_ob-kBuyBgpT1M7Mt9SHaoSE1y25SoKgPCwT87gVSRHKvmV1frTNi55RbX9Vn38sHKx5uMXMfdSaHqbOR_dnrqXsdhm7B-NyHrezzvyrngSZcRw',
   'Clearix Niacinamide 10% Serum', 0, true),
  ('d0000000-0000-4000-8000-000000000701', 'c0000000-0000-4000-8000-000000000007',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBHr3fZkMSUJbt5Nl8FUOqn3fJQsjYi-mf1_6IZnTmeVrUmzxm3QfP0FeKKR5vE5tn-7B6PSHXOXxdCbEsXJIFpmwnIVdlJaKeTRIp7aWM6bDYC_Ph3pfKkOIsimw5-T_-6T8STx7uRWTVpmMX46BL6wDax4bFVJ78oQyu44_y4hJw3xn84QPef98FPsf2HJmtBus6iV1liMsILpfobqEJj1sOJTOBOmOhZP_rjgi38VHalU0ADjLIt8A',
   'SilkSoul Nourishing Hair Serum', 0, true),
  ('d0000000-0000-4000-8000-000000000801', 'c0000000-0000-4000-8000-000000000008',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-UESO5yAk6wHe9b0uK-QCym_4IA6Vj1R57XJTqlCLeKmWPn-4Z0WjQermT2SWosfiuc1G7Kxc0HY92RWiwoUpwU7fnoZy0QQkZiTHbyr67PQ0QdLp-oADALxcWXjLsxEZNxRbFEqrH7JGJv859AMUCfVl-nJUxpIafalhyrD5xOBN4ajAFlb38LiP0GvXK9u65ARjWPaiky76HBP4YkzWCzYOiv8WkE89ahwOCowww0gE84rtsugnQ',
   'Clearix Gentle Hydrating Cleanser', 0, true)
on conflict (id) do nothing;

-- ---- COLLECTION PRODUCTS ----
insert into public.collection_products (collection_id, product_id, sort_order)
values
  ('a0000000-0000-4000-8000-000000000201', 'c0000000-0000-4000-8000-000000000001', 0),
  ('a0000000-0000-4000-8000-000000000201', 'c0000000-0000-4000-8000-000000000003', 1),
  ('a0000000-0000-4000-8000-000000000201', 'c0000000-0000-4000-8000-000000000002', 2),
  ('a0000000-0000-4000-8000-000000000201', 'c0000000-0000-4000-8000-000000000004', 3),
  ('a0000000-0000-4000-8000-000000000202', 'c0000000-0000-4000-8000-000000000002', 0),
  ('a0000000-0000-4000-8000-000000000202', 'c0000000-0000-4000-8000-000000000004', 1),
  ('a0000000-0000-4000-8000-000000000202', 'c0000000-0000-4000-8000-000000000005', 2),
  ('a0000000-0000-4000-8000-000000000202', 'c0000000-0000-4000-8000-000000000007', 3),
  ('a0000000-0000-4000-8000-000000000203', 'c0000000-0000-4000-8000-000000000001', 0),
  ('a0000000-0000-4000-8000-000000000203', 'c0000000-0000-4000-8000-000000000006', 1),
  ('a0000000-0000-4000-8000-000000000203', 'c0000000-0000-4000-8000-000000000008', 2)
on conflict do nothing;

-- ---- REVIEWS ----
insert into public.reviews (id, product_id, customer_id, rating, title, comment, status)
values
  ('e0000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000001', null, 5,
   'Clear skin without the tight feeling',
   'The Clearix Anti-Acne Wash changed my persistent breakouts within three weeks without leaving my skin stripped or tight.',
   'APPROVED'),
  ('e0000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000001', null, 5,
   'Exemplary formulation purity',
   'The inclusion of physiological zinc along with microencapsulated BHA provides safe keratolytics for patient maintenance.',
   'APPROVED'),
  ('e0000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000001', null, 5,
   'Gentle yet effective',
   'Beautiful packaging and the product quality is even better.',
   'APPROVED'),
  ('e0000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000002', null, 5,
   'Compatible and brightening',
   'As a practitioner, I respect the clean stabilization of the 15% Vitamin C. It is both biocompatible and visibly brightening.',
   'APPROVED'),
  ('e0000000-0000-4000-8000-000000000005', 'c0000000-0000-4000-8000-000000000002', null, 4,
   'Great glow',
   'Noticed a visible glow within two weeks of daily morning use.',
   'APPROVED'),
  ('e0000000-0000-4000-8000-000000000006', 'c0000000-0000-4000-8000-000000000003', null, 5,
   'Restored hair density',
   'The Herbal Hair Oil brings back the traditional comfort of scalp oiling with zero heavy mineral residue.',
   'APPROVED')
on conflict (id) do nothing;

-- ---- SITE SETTINGS ----
insert into public.site_settings (key, value)
values
  ('site_name', 'SilkSoul'),
  ('support_email', 'care@silksoul.com'),
  ('support_phone', '+92 300 1234567'),
  ('whatsapp_number', '+92 300 1234567'),
  ('currency', 'PKR'),
  ('delivery_message', 'Free delivery on orders above Rs. 3,000'),
  ('announcement_bar_enabled', 'true'),
  ('announcement_bar_text', 'Free delivery on orders above Rs. 3,000'),
  ('free_delivery_threshold', '3000'),
  ('standard_delivery_fee', '200')
on conflict (key) do nothing;

-- ---- CUSTOMERS ----
insert into public.customers (id, name, email, phone, city, address, notes)
values
  ('b0000000-0000-4000-8000-000000000001', 'Ayesha Khan', 'ayesha@example.com', '+92 331 1234567',
   'Karachi', 'House 14, Block B, Gulshan-e-Iqbal', null),
  ('b0000000-0000-4000-8000-000000000002', 'Zainab Raza', 'zainab@example.com', '+92 300 4455667',
   'Lahore', 'Street 5, Askari 14', null),
  ('b0000000-0000-4000-8000-000000000003', 'Dr. Tariq Kamal', 'tariq@example.com', '+92 321 7788990',
   'Islamabad', 'Office 22, Blue Area', null),
  ('b0000000-0000-4000-8000-000000000004', 'Noor Zainab', 'noor@example.com', '+92 311 2233445',
   'Karachi', 'House 4-B, Phase 5, DHA', null)
on conflict (id) do nothing;

-- ---- ORDERS (Order Request / Quotation workflow) ----
insert into public.orders (
  id, order_number, customer_name, email, phone, address, city, notes,
  subtotal, delivery_fee, grand_total, status, admin_note
)
values
  ('f0000000-0000-4000-8000-000000000001', 'SSL-20260908-8001', 'Ayesha Khan', 'ayesha@example.com',
   '+92 331 1234567', 'House 14, Block B, Gulshan-e-Iqbal', 'Karachi',
   'Please deliver after 5pm on weekdays.', 4697, 0, 4697, 'PENDING', null),
  ('f0000000-0000-4000-8000-000000000002', 'SSL-20260907-8002', 'Zainab Raza', 'zainab@example.com',
   '+92 300 4455667', 'Street 5, Askari 14', 'Lahore', null, 3198, 0, 3198, 'APPROVED',
   'Call customer to confirm quantities.'),
  ('f0000000-0000-4000-8000-000000000003', 'SSL-20260906-8003', 'Dr. Tariq Kamal', 'tariq@example.com',
   '+92 321 7788990', 'Office 22, Blue Area', 'Islamabad', null, 2898, 200, 3098, 'SHIPPED',
   'Shipped via Leopards, tracking shared on WhatsApp.'),
  ('f0000000-0000-4000-8000-000000000004', 'SSL-20260903-8004', 'Noor Zainab', 'noor@example.com',
   '+92 311 2233445', 'House 4-B, Phase 5, DHA', 'Karachi', null, 3649, 0, 3649, 'DELIVERED',
   'Delivered and confirmed by customer.')
on conflict (id) do nothing;

-- ---- ORDER ITEMS ----
insert into public.order_items (id, order_id, product_id, product_name, product_image, unit_price, quantity, line_total)
values
  ('fe000000-0000-4000-8000-000000000001', 'f0000000-0000-4000-8000-000000000001',
   'c0000000-0000-4000-8000-000000000001', 'Anti-Acne Face Wash', null, 1499, 2, 2998),
  ('fe000000-0000-4000-8000-000000000002', 'f0000000-0000-4000-8000-000000000001',
   'c0000000-0000-4000-8000-000000000006', 'Niacinamide 10% Serum', null, 1699, 1, 1699),
  ('fe000000-0000-4000-8000-000000000003', 'f0000000-0000-4000-8000-000000000002',
   'c0000000-0000-4000-8000-000000000003', 'Herbal Hair Oil', null, 1599, 2, 3198),
  ('fe000000-0000-4000-8000-000000000004', 'f0000000-0000-4000-8000-000000000003',
   'c0000000-0000-4000-8000-000000000001', 'Anti-Acne Face Wash', null, 1499, 1, 1499),
  ('fe000000-0000-4000-8000-000000000005', 'f0000000-0000-4000-8000-000000000003',
   'c0000000-0000-4000-8000-000000000008', 'Gentle Hydrating Cleanser', null, 1399, 1, 1399),
  ('fe000000-0000-4000-8000-000000000006', 'f0000000-0000-4000-8000-000000000004',
   'c0000000-0000-4000-8000-000000000002', 'Vitamin C Brightening Serum', null, 1799, 1, 1799),
  ('fe000000-0000-4000-8000-000000000007', 'f0000000-0000-4000-8000-000000000004',
   'c0000000-0000-4000-8000-000000000007', 'Nourishing Hair Serum', null, 1850, 1, 1850)
on conflict (id) do nothing;

-- ---- QUERIES (contact / support inbox) ----
insert into public.queries (id, name, email, phone, subject, message, status)
values
  ('fa000000-0000-4000-8000-000000000001', 'Zainab Raza', 'zainab@example.com', '+92 300 4455667',
   'Order dispatch estimate',
   'Hi, I approved order SSL-20260907-8002. When should I expect the courier pickup?', 'NEW'),
  ('fa000000-0000-4000-8000-000000000002', 'Areeba Malik', 'areeba@example.com', null,
   'Pregnancy-safe products',
   'Is the Vitamin C Brightening Serum safe to use during pregnancy and nursing?', 'NEW'),
  ('fa000000-0000-4000-8000-000000000003', 'Hamza Sheikh', 'hamza@beautystore.pk', '+92 333 9012345',
   'Wholesale inquiry',
   'We run a beauty retail chain in Karachi. Do you offer bulk/wholesale pricing on Clearix?', 'IN_PROGRESS'),
  ('fa000000-0000-4000-8000-000000000004', 'Mahira Shah', 'mahira@example.com', '+92 345 1122334',
   'Product recommendation — acne scarring',
   'I have mild acne scarring and oily skin. Should I pick the Niacinamide or Vitamin C serum?', 'RESOLVED')
on conflict (id) do nothing;

-- ---- PENDING REVIEWS (visible in admin moderation queue) ----
insert into public.reviews (id, product_id, customer_id, rating, title, comment, status)
values
  ('e0000000-0000-4000-8000-000000000007', 'c0000000-0000-4000-8000-000000000001', null, 4,
   'Works well, slightly drying',
   'Breakouts cleared up nicely within three weeks. Skin felt a little tight so I follow up with a moisturizer.',
   'PENDING'),
  ('e0000000-0000-4000-8000-000000000008', 'c0000000-0000-4000-8000-000000000006', null, 5,
   'Great for oily skin',
   'Controls oil much better than expected. Pores look smaller after a few weeks of daily use.',
   'PENDING')
on conflict (id) do nothing;

-- ============================================================================
-- ADMIN PROFILE (optional, runs AFTER you create your auth user in Supabase)
-- ============================================================================
-- The admin dashboard requires a signed-in Supabase auth user whose public
-- profile row has role = 'ADMIN'. Seed it after creating the user:
--
--   insert into public.profiles (id, full_name, email, role)
--   values ('<auth-user-uuid>', 'Store Admin', 'admin@silksoul.com', 'ADMIN')
--   on conflict (id) do nothing;
--
-- Replace <auth-user-uuid> with the id of the auth user created in
-- Authentication > Users. Only ever run this as the Supabase owner/service role.
-- ============================================================================