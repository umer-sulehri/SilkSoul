# SilkSoul — E-Commerce & Product Management Platform

**Project Type:** Scalable E-Commerce / Product Catalog / Order Quotation Platform
**Brand:** SilkSoul
**Current Product Line:** Clearix
**Future Product Lines:** Herbal Oils, Shampoos, Hair Care, Skincare, Body Care, Wellness & other personal-care products
**Primary Goal:** Build a scalable e-commerce platform where all products, categories, brands, pricing, inventory, content, orders, quotations, and customer queries are controlled through an admin dashboard.

---

# 1. Project Overview

SilkSoul is a modern, scalable online shopping platform for beauty, skincare, haircare, herbal care, body care, and personal-care products.

At launch, SilkSoul will primarily sell **Clearix products**. However, Clearix must NOT be hardcoded into the website architecture.

The platform must be designed as a generic product-based e-commerce system so that SilkSoul can add, remove, replace, or introduce completely different product lines in the future without requiring major frontend or backend changes.

Future products may include:

* Herbal oils
* Herbal shampoos
* Hair oils
* Hair serums
* Face washes
* Face serums
* Sunscreens
* Body oils
* Body care products
* Natural/herbal products
* Beauty products
* Wellness products
* Other personal-care products

All product information must be dynamically managed from the admin dashboard.

---

# 2. Core Business Model

SilkSoul will initially operate using an **Order Request / Quotation workflow** rather than requiring immediate online payment.

The customer selects products and submits an order request.

The admin reviews the request and can:

* Accept the request
* Reject the request
* Adjust pricing
* Add delivery charges
* Add discounts
* Add notes
* Update the order status

The customer is then informed about the result.

This system should be designed so that online payment can be integrated later without rebuilding the ordering system.

---

# 3. Main Customer Flow

```text
Customer
   |
   v
Home
   |
   v
Shop / Products
   |
   v
Product Details
   |
   v
Select Quantity
   |
   v
Add to Cart
   |
   v
Cart
   |
   v
Confirm Order
   |
   v
Customer Information
   |
   v
Checkout
   |
   v
Submit Order Request
   |
   v
Thank You / Order Confirmation
   |
   v
Admin Review
   |
   +-------------------+
   |                   |
   v                   v
Accept              Reject
   |                   |
   v                   v
Confirmed           Rejected
Order                Order
```

---

# 4. Customer Website

## 4.1 Home Page

The homepage should communicate SilkSoul as a premium beauty and personal-care brand.

The homepage must NOT be designed exclusively around Clearix.

### Homepage Sections

1. Announcement Bar
2. Navbar
3. Hero Section
4. Featured Products
5. Shop by Category
6. Best Sellers
7. New Arrivals
8. Shop by Concern
9. Why SilkSoul
10. Brand/Product Highlight
11. Customer Reviews
12. Newsletter / Contact CTA
13. Footer

---

## 4.2 Announcement Bar

Admin-controlled announcement.

Examples:

```text
Free delivery on orders above Rs. 3,000
```

or:

```text
New products arriving soon
```

Admin should be able to enable/disable this section.

---

# 5. Navigation

Desktop navigation:

```text
SilkSoul Logo

Home
Shop
Categories
New Arrivals
Best Sellers
About
Contact

Search
Wishlist
Cart
Account
```

Mobile navigation:

```text
Home
Shop
Search
Cart
Account
```

Categories should be dynamically generated from the database.

Example:

```text
Skincare
Hair Care
Herbal Care
Body Care
Wellness
```

Do NOT hardcode categories.

---

# 6. Shop Page

Route:

```text
/shop
```

Purpose:

Display all active products.

Features:

* Product grid
* Search
* Category filtering
* Brand filtering
* Price filtering
* Availability filtering
* Sorting
* Pagination / infinite loading
* Product quick view
* Add to cart
* Wishlist

Sorting options:

```text
Featured
Newest
Price: Low to High
Price: High to Low
Best Selling
```

---

# 7. Product Card

Each product card should display:

```text
Product Image
Brand
Product Name
Rating
Price
Sale Price
Discount
Stock Status
```

Actions:

```text
Add to Cart
Wishlist
Quick View
```

Example:

```text
--------------------------------
|                              |
|        PRODUCT IMAGE         |
|                              |
--------------------------------
Clearix

Anti-Acne Face Wash

★★★★★

Rs. 1,499
Rs. 1,299

[ Add to Cart ]
```

---

# 8. Product Details Page

Route:

```text
/product/[slug]
```

The page must be fully dynamic.

## Product Details

Display:

* Product gallery
* Product name
* Brand
* Category
* Price
* Sale price
* Discount
* Rating
* Review count
* Stock status
* SKU
* Short description
* Quantity selector
* Add to Cart
* Buy/Continue Checkout
* Wishlist

---

# 9. Product Information Sections

Product pages should support:

### Description

Rich product description.

### Benefits

Example:

```text
Helps cleanse the skin
Helps control excess oil
Suitable for daily use
```

### Ingredients

Dynamic list.

### How To Use

Rich text.

### Suitable For

Examples:

```text
Oily Skin
Combination Skin
Acne-Prone Skin
```

### Specifications

Dynamic key/value fields.

Example:

```text
Volume: 100ml
Skin Type: Oily
Product Type: Face Wash
```

### Reviews

Customer reviews.

### FAQs

Product-specific questions and answers.

### Related Products

Automatically show related products based on:

* Category
* Subcategory
* Brand
* Tags

---

# 10. Product Architecture

The most important architecture rule:

**Clearix must be treated as a brand/product line, not as the application itself.**

Bad architecture:

```text
ClearixProducts
ClearixCategories
ClearixPages
```

Correct architecture:

```text
Products
Brands
Categories
Collections
Orders
Customers
```

Current:

```text
Brand:
Clearix
```

Future:

```text
Brand:
SilkSoul
```

or:

```text
Brand:
Another Brand
```

---

# 11. Categories

Categories must be admin-controlled.

Possible initial categories:

```text
Skincare
Hair Care
Herbal Care
Body Care
Wellness
```

Possible subcategories:

```text
Skincare
├── Face Wash
├── Serums
├── Sunscreen
├── Moisturizers
└── Treatments

Hair Care
├── Shampoo
├── Hair Oil
├── Hair Serum
└── Treatments

Herbal Care
├── Herbal Oils
├── Herbal Shampoo
└── Natural Care

Body Care
├── Body Oil
├── Body Wash
└── Body Lotion
```

Admin can create additional categories.

---

# 12. Brands

Brands must also be dynamic.

Example:

```text
Clearix
SilkSoul
Future Brand
```

Each brand can have:

* Name
* Logo
* Description
* Banner
* Status
* SEO metadata

---

# 13. Collections

The system should support collections.

Examples:

```text
Best Sellers
New Arrivals
Acne Care
Hair Care Essentials
Herbal Collection
Summer Essentials
Daily Skincare
```

Collections are admin-controlled.

Products can belong to multiple collections.

---

# 14. Shop by Concern

SilkSoul should support product discovery based on customer needs.

Examples:

```text
Acne & Breakouts
Dark Spots
Oily Skin
Dry Skin
Uneven Skin
Hair Fall
Dry Hair
Dandruff
Daily Care
```

Concerns should be stored as tags/relations rather than hardcoded.

---

# 15. Cart

Route:

```text
/cart
```

The cart must support:

* Add product
* Remove product
* Increase quantity
* Decrease quantity
* Update quantity
* Product availability checking
* Subtotal calculation
* Estimated delivery
* Discount display
* Total calculation

Example:

```text
Cart

Clearix Face Wash
Quantity: 2
Price: Rs. 2,598

Vitamin C Serum
Quantity: 1
Price: Rs. 1,299

----------------------------

Subtotal: Rs. 3,897

[ Continue Shopping ]
[ Confirm Order ]
```

---

# 16. Checkout

The checkout process should be simple.

## Customer Information

Required fields:

```text
Full Name
Phone Number
Email
Address
City
Postal Code
Additional Notes
```

Optional:

```text
Company Name
Delivery Instructions
```

The system should validate:

* Required fields
* Phone number
* Email format
* Address
* Cart availability

---

# 17. Order Submission

When the customer submits the checkout form:

1. Validate customer data.
2. Validate cart.
3. Verify product availability.
4. Create customer record if needed.
5. Create order.
6. Create order items.
7. Calculate subtotal.
8. Set initial status to `PENDING`.
9. Generate unique order number.
10. Show confirmation page.

Example order number:

```text
SSL-20260908-0001
```

---

# 18. Thank You Page

Route:

```text
/order-success/[orderNumber]
```

Display:

```text
Order Request Submitted Successfully!

Thank you for shopping with SilkSoul.

Your order request has been received.

Order Number:
SSL-20260908-0001

Our team will review your request
and contact you regarding confirmation.

[ Continue Shopping ]
```

---

# 19. Customer Order Status

If customer accounts are enabled, customers should be able to view their orders.

Example:

```text
My Orders

SSL-20260908-0001
Rs. 4,797
Pending

SSL-20260907-0008
Rs. 2,399
Accepted

SSL-20260901-0004
Rs. 1,499
Delivered
```

---

# 20. Order Status System

Recommended statuses:

```text
PENDING
UNDER_REVIEW
ACCEPTED
CONFIRMED
PROCESSING
SHIPPED
DELIVERED
REJECTED
CANCELLED
RETURNED
```

Basic MVP flow:

```text
PENDING
   |
   v
UNDER_REVIEW
   |
   +----------+
   |          |
   v          v
ACCEPTED   REJECTED
   |
   v
CONFIRMED
```

Future:

```text
CONFIRMED
   |
   v
PROCESSING
   |
   v
SHIPPED
   |
   v
DELIVERED
```

---

# 21. Admin Dashboard

Route:

```text
/admin
```

Admin dashboard is the central management system for SilkSoul.

Admin controls:

```text
Products
Categories
Brands
Collections
Orders
Quotations
Customers
Queries
Reviews
Inventory
Website Content
Settings
```

---

# 22. Admin Dashboard Overview

Dashboard cards:

```text
Total Products
Total Customers
Total Orders
Pending Orders
Accepted Orders
Rejected Orders
Total Revenue
Pending Queries
Low Stock Products
```

Example:

```text
Total Products       48
Total Customers      312
Pending Orders       14
Accepted Orders      96
Rejected Orders      8
Pending Queries      12
```

---

# 23. Admin Product Management

Route:

```text
/admin/products
```

Features:

* View products
* Search products
* Filter products
* Add product
* Edit product
* Delete product
* Activate/deactivate product
* Manage stock
* Manage images
* Manage pricing
* Manage product details

---

# 24. Add Product

Admin should be able to create any product.

Fields:

```text
Product Name
Slug
Brand
Category
Subcategory
SKU
Price
Sale Price
Stock
Short Description
Description
```

Media:

```text
Main Image
Gallery Images
Product Video (optional)
```

Product information:

```text
Benefits
Ingredients
How To Use
Suitable For
Specifications
Tags
```

Marketing:

```text
Featured
Best Seller
New Arrival
```

SEO:

```text
SEO Title
SEO Description
SEO Keywords
```

Status:

```text
Draft
Published
Archived
```

---

# 25. Product Variants

The architecture should support variants even if they are not required for the first launch.

Examples:

```text
Size:
50ml
100ml
200ml
```

or:

```text
Pack:
Single
Pack of 2
Pack of 3
```

Variant fields:

```text
Variant Name
SKU
Price
Sale Price
Stock
Image
Status
```

---

# 26. Inventory

Admin should be able to see:

```text
Product
SKU
Current Stock
Reserved Stock
Available Stock
Status
```

Inventory statuses:

```text
In Stock
Low Stock
Out of Stock
```

Admin should receive warnings when stock reaches the configured threshold.

---

# 27. Orders / Quotations

Route:

```text
/admin/orders
```

Sections:

```text
All
Pending
Under Review
Accepted
Confirmed
Processing
Shipped
Delivered
Rejected
Cancelled
```

Each order displays:

```text
Order Number
Customer
Date
Items
Subtotal
Total
Status
```

---

# 28. Order Details

Admin can view:

```text
Order Information
Customer Information
Shipping Information
Products
Quantities
Original Prices
Subtotal
Delivery Fee
Discount
Final Total
Customer Notes
Admin Notes
Order History
```

---

# 29. Accept Order

When admin reviews an order, they can accept it.

Admin may configure:

```text
Subtotal
Delivery Charges
Discount
Final Total
Admin Notes
```

Example:

```text
Original Subtotal:
Rs. 4,797

Delivery:
Rs. 200

Discount:
Rs. 300

Final Total:
Rs. 4,697
```

Action:

```text
[ Accept Order ]
```

Status changes:

```text
UNDER_REVIEW
      ↓
ACCEPTED
```

---

# 30. Reject Order

Admin can reject an order.

Rejection reasons:

```text
Product unavailable
Out of stock
Pricing issue
Delivery unavailable
Customer information incomplete
Other
```

Admin can add a custom note.

Example:

```text
Reason:
Product currently unavailable.

Admin Note:
We expect new stock within 5 days.
```

Status:

```text
REJECTED
```

---

# 31. Order History

Every order should maintain a status history.

Example:

```text
08 Sep 2026 10:10
Order Created
PENDING

08 Sep 2026 10:25
Admin Started Review
UNDER_REVIEW

08 Sep 2026 10:32
Order Accepted
ACCEPTED
```

This provides accountability and debugging capability.

---

# 32. Customer Management

Route:

```text
/admin/customers
```

Admin can see:

```text
Name
Email
Phone
Total Orders
Total Spent
Last Order
Account Status
```

Customer profile:

```text
Customer Information
Order History
Queries
Addresses
Reviews
```

---

# 33. Customer Queries

Customers can submit queries through the website.

Route:

```text
/contact
```

Fields:

```text
Name
Email
Phone
Subject
Message
```

Admin dashboard:

```text
/admin/queries
```

Statuses:

```text
NEW
IN_PROGRESS
RESOLVED
CLOSED
```

Admin actions:

```text
View
Reply
Mark as Resolved
Close
```

---

# 34. Query Details

Example:

```text
Customer:
Ali Ahmed

Subject:
Delivery to Islamabad

Message:
Do you deliver to Islamabad?

Status:
NEW
```

Admin can respond:

```text
Reply:
Yes, we currently deliver to Islamabad.

[ Send Reply ]
```

---

# 35. Reviews

Customers should be able to review products.

Review fields:

```text
Customer
Product
Rating
Title
Comment
Images (optional)
Status
Created At
```

Admin controls:

```text
Approve
Reject
Delete
Hide
```

Only approved reviews should appear publicly.

---

# 36. Wishlist

Customers can save products.

Features:

```text
Add to Wishlist
Remove from Wishlist
Move to Cart
```

Wishlist requires a customer account.

For guest users, wishlist can optionally use browser/local storage.

---

# 37. Authentication

## Customer Authentication

Optional for placing an order initially.

Recommended:

```text
Guest Checkout
+
Optional Account
```

Customers can:

* Register
* Login
* Logout
* Reset password
* View orders
* Manage profile
* Manage wishlist

## Admin Authentication

Admin login must always be protected.

Admin routes must require authentication and authorization.

---

# 38. Admin Roles

Initial MVP:

```text
SUPER_ADMIN
ADMIN
```

Future roles:

```text
PRODUCT_MANAGER
ORDER_MANAGER
SUPPORT_AGENT
CONTENT_MANAGER
```

Permissions should be role-based.

Example:

```text
SUPER_ADMIN
    All permissions

PRODUCT_MANAGER
    Products
    Categories
    Brands
    Inventory

ORDER_MANAGER
    Orders
    Customers

SUPPORT_AGENT
    Queries
    Customers
```

---

# 39. Database Architecture

Use PostgreSQL through Supabase.

Core tables:

```text
profiles
products
product_images
product_variants
categories
brands
collections
collection_products
product_benefits
product_ingredients
product_tags
tags
customers
addresses
orders
order_items
order_status_history
queries
reviews
wishlists
wishlist_items
site_settings
homepage_sections
admin_users
```

---

# 40. Users / Profiles

```text
profiles

id
user_id
full_name
email
phone
avatar_url
role
status
created_at
updated_at
```

Roles:

```text
CUSTOMER
ADMIN
SUPER_ADMIN
```

---

# 41. Products Table

```text
products

id
name
slug
brand_id
category_id
subcategory_id
sku
short_description
description
price
sale_price
stock_quantity
low_stock_threshold
status
featured
best_seller
new_arrival
seo_title
seo_description
created_at
updated_at
```

Status:

```text
DRAFT
PUBLISHED
ARCHIVED
```

---

# 42. Product Images

```text
product_images

id
product_id
image_url
alt_text
sort_order
is_primary
created_at
```

---

# 43. Product Variants

```text
product_variants

id
product_id
name
sku
price
sale_price
stock_quantity
image_url
status
created_at
updated_at
```

---

# 44. Categories

```text
categories

id
name
slug
description
image_url
parent_id
status
sort_order
created_at
updated_at
```

`parent_id` allows nested categories.

Example:

```text
Skincare
    |
    +-- Face Wash
    +-- Serum
    +-- Sunscreen
```

---

# 45. Brands

```text
brands

id
name
slug
logo_url
description
banner_url
status
seo_title
seo_description
created_at
updated_at
```

---

# 46. Collections

```text
collections

id
name
slug
description
image_url
status
featured
created_at
updated_at
```

Relationship:

```text
collection_products

collection_id
product_id
```

---

# 47. Orders

```text
orders

id
order_number
customer_id
status
subtotal
delivery_fee
discount
total
customer_notes
admin_notes
rejection_reason
created_at
updated_at
```

---

# 48. Order Items

```text
order_items

id
order_id
product_id
variant_id
product_name
sku
quantity
unit_price
subtotal
created_at
```

Store product name and price at order time so historical orders remain accurate even if the product changes later.

---

# 49. Addresses

```text
addresses

id
customer_id
full_name
phone
address
city
postal_code
country
is_default
created_at
updated_at
```

---

# 50. Order Status History

```text
order_status_history

id
order_id
old_status
new_status
changed_by
note
created_at
```

---

# 51. Queries

```text
queries

id
customer_id
name
email
phone
subject
message
status
admin_reply
assigned_to
created_at
updated_at
resolved_at
```

---

# 52. Reviews

```text
reviews

id
product_id
customer_id
rating
title
comment
status
created_at
updated_at
```

Status:

```text
PENDING
APPROVED
REJECTED
```

---

# 53. Wishlist

```text
wishlists

id
customer_id
created_at
```

```text
wishlist_items

id
wishlist_id
product_id
created_at
```

---

# 54. Site Settings

Website-wide configuration should be database-driven.

```text
site_settings

id
key
value
type
updated_at
```

Examples:

```text
site_name
logo
favicon
support_email
support_phone
whatsapp_number
currency
delivery_message
announcement_bar
```

---

# 55. Homepage CMS

The homepage should eventually be editable from the admin dashboard.

Admin should be able to control:

```text
Hero heading
Hero description
Hero image
CTA text
CTA link
Featured products
Featured categories
Collection banners
Promotional sections
```

This prevents the homepage from becoming developer-dependent.

---

# 56. Technology Stack

## Frontend

```text
Next.js
TypeScript
React
Tailwind CSS
```

Recommended:

```text
Next.js App Router
```

---

# 57. Backend

Use:

```text
Next.js Server Actions
Next.js Route Handlers
```

Backend responsibilities:

* Product operations
* Cart operations
* Order creation
* Order management
* Admin operations
* Customer operations
* Query management
* Review management
* Authentication checks

---

# 58. Database

```text
Supabase PostgreSQL
```

Use:

* PostgreSQL
* Row Level Security
* Supabase Auth
* Supabase Storage

---

# 59. Storage

Supabase Storage should store:

```text
Product Images
Brand Logos
Category Images
Collection Images
Homepage Images
Review Images
```

Recommended buckets:

```text
products
brands
categories
collections
website
reviews
```

---

# 60. Authentication

Use:

```text
Supabase Auth
```

Customer authentication:

```text
Email/password
```

Potential future:

```text
Google
Phone OTP
```

Admin authentication should have stricter authorization.

---

# 61. Payments

Payment is NOT required for the initial quotation workflow.

The architecture should remain payment-ready.

Future support:

```text
Online Payment
Cash on Delivery
Bank Transfer
Payment Gateway
```

Payment should be implemented as a separate module.

Do not tightly couple payment logic to order creation.

---

# 62. Future Payment Architecture

Future flow:

```text
Order Accepted
      |
      v
Payment Required
      |
      v
Payment Gateway
      |
      v
Payment Successful
      |
      v
Order Confirmed
```

Possible future integrations:

```text
Stripe
Local Pakistani Payment Gateway
Bank Transfer
Cash on Delivery
```

---

# 63. API / Server Actions

Core operations:

```text
Products
---------
getProducts()
getProduct()
createProduct()
updateProduct()
deleteProduct()
updateProductStatus()


Categories
----------
getCategories()
createCategory()
updateCategory()
deleteCategory()


Brands
------
getBrands()
createBrand()
updateBrand()
deleteBrand()


Cart
----
getCart()
addToCart()
updateCartItem()
removeCartItem()
clearCart()


Orders
------
createOrder()
getOrder()
getCustomerOrders()
getAdminOrders()
acceptOrder()
rejectOrder()
updateOrderStatus()


Queries
-------
createQuery()
getQueries()
replyToQuery()
updateQueryStatus()


Reviews
-------
createReview()
getProductReviews()
approveReview()
rejectReview()
```

---

# 64. Validation

Use a schema validation library such as:

```text
Zod
```

Validate:

* Product forms
* Customer forms
* Checkout
* Queries
* Reviews
* Admin forms
* Order data

Never trust client-side validation alone.

All important validation must also happen server-side.

---

# 65. Security

Required security measures:

* Supabase Row Level Security
* Protected admin routes
* Role-based authorization
* Server-side validation
* Input sanitization
* Secure authentication
* Secure file uploads
* Rate limiting where appropriate
* No sensitive data exposed to frontend
* Environment variables for secrets

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

to the client.

---

# 66. SEO

Every public product should have:

```text
SEO Title
SEO Description
Canonical URL
Open Graph Image
Structured Data
```

Product structured data should include:

```text
Product
Offer
Brand
Rating
Review
```

Category pages should also be SEO-friendly.

URLs should use slugs:

```text
/products/clearix-anti-acne-face-wash
```

instead of:

```text
/products/123
```

---

# 67. Performance

Requirements:

* Next.js image optimization
* Lazy loading
* Server-side rendering where appropriate
* Static generation for product/category pages where appropriate
* Database indexing
* Pagination
* Optimized queries
* Compressed images
* Minimal JavaScript
* Mobile-first performance

Target:

```text
Fast loading
Responsive UI
Good Core Web Vitals
```

---

# 68. Responsive Design

The website must work on:

```text
Mobile
Tablet
Laptop
Desktop
Large Screens
```

Primary priority:

```text
Mobile
```

The design should not simply shrink the desktop UI.

Mobile layouts should be intentionally designed.

---

# 69. Visual Design Direction

SilkSoul should have a:

```text
Premium
Clean
Modern
Elegant
Trustworthy
Beauty-focused
Minimal
```

visual identity.

Avoid:

```text
Overly colorful UI
Cheap marketplace appearance
Excessive gradients
Too many cards
Crowded layouts
Generic Shopify appearance
```

---

# 70. Suggested Color System

Primary:

```text
Warm White / Cream
```

Secondary:

```text
Charcoal / Deep Black
```

Accent:

```text
Soft Gold
Muted Green
```

The final palette should be derived from the SilkSoul brand identity and product packaging.

---

# 71. Typography

Recommended design:

```text
Headings:
Elegant premium serif or refined display font

Body:
Modern sans-serif
```

Typography should prioritize:

* Readability
* Premium appearance
* Strong hierarchy
* Mobile accessibility

---

# 72. Components

Reusable UI components should include:

```text
Navbar
Footer
AnnouncementBar
HeroSection
ProductCard
ProductGrid
ProductGallery
ProductInfo
PriceDisplay
RatingStars
QuantitySelector
AddToCartButton
WishlistButton
CategoryCard
CollectionCard
SearchBar
FilterPanel
SortDropdown
CartItem
CartSummary
CheckoutForm
OrderSummary
OrderStatusBadge
ReviewCard
FAQAccordion
Modal
Toast
Pagination
EmptyState
LoadingState
```

---

# 73. Admin Components

```text
AdminSidebar
AdminHeader
DashboardCard
DataTable
ProductForm
CategoryForm
BrandForm
CollectionForm
OrderTable
OrderDetails
OrderStatusBadge
CustomerTable
CustomerDetails
QueryTable
QueryDetails
ReviewTable
InventoryTable
MediaUploader
RichTextEditor
ConfirmDialog
```

---

# 74. Recommended Folder Structure

```text
silksoul/
│
├── app/
│   │
│   ├── (store)/
│   │   ├── page.tsx
│   │   ├── shop/
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── products/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── collections/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── order-success/
│   │   │   └── [orderNumber]/
│   │   │       └── page.tsx
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   ├── account/
│   │   │   ├── page.tsx
│   │   │   └── orders/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   ├── shipping/
│   │   │   └── page.tsx
│   │   └── returns/
│   │       └── page.tsx
│   │
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── collections/
│   │   ├── inventory/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── queries/
│   │   ├── reviews/
│   │   ├── homepage/
│   │   └── settings/
│   │
│   ├── api/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── queries/
│   │   ├── reviews/
│   │   └── uploads/
│   │
│   ├── login/
│   ├── register/
│   └── forgot-password/
│
├── components/
│   ├── ui/
│   ├── store/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── admin/
│   └── shared/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── validations/
│   ├── utils/
│   ├── orders/
│   ├── products/
│   └── constants/
│
├── actions/
│   ├── products.ts
│   ├── categories.ts
│   ├── brands.ts
│   ├── cart.ts
│   ├── orders.ts
│   ├── queries.ts
│   └── reviews.ts
│
├── types/
│   ├── product.ts
│   ├── order.ts
│   ├── customer.ts
│   ├── category.ts
│   └── admin.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── .env.local
├── .env.example
├── PROJECT.md
├── README.md
├── package.json
└── tsconfig.json
```

---

# 75. Environment Variables

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_SITE_URL=

NEXT_PUBLIC_CURRENCY=PKR
```

Never commit `.env.local`.

---

# 76. Cart Strategy

For MVP, cart can support guest users.

Recommended:

```text
Guest Cart
    ↓
Browser local storage
```

When authenticated:

```text
Customer Cart
    ↓
Database
```

Eventually cart can be synchronized between guest and authenticated sessions.

---

# 77. Order Number Generation

Order numbers must be unique.

Format:

```text
SSL-YYYYMMDD-XXXX
```

Example:

```text
SSL-20260908-0001
```

Do not rely solely on frontend-generated order numbers.

Generate them securely on the server.

---

# 78. Error Handling

Every major flow must have:

```text
Loading State
Success State
Error State
Empty State
```

Examples:

```text
Products unavailable
Cart empty
Order submission failed
Product out of stock
Invalid checkout information
Unauthorized admin access
```

Errors should be user-friendly.

Never display raw database errors to customers.

---

# 79. Notifications

MVP can initially use:

```text
In-app confirmation
```

Future:

```text
Email
SMS
WhatsApp
```

Potential notifications:

```text
Order Received
Order Accepted
Order Rejected
Order Confirmed
Order Shipped
Order Delivered
Query Reply
```

Notification architecture should be modular.

---

# 80. WhatsApp Integration

Because SilkSoul may operate in Pakistan, WhatsApp can be added later.

Potential actions:

```text
Contact on WhatsApp
Ask About Product
Order Confirmation
Admin Customer Communication
```

The WhatsApp number should be managed from admin settings rather than hardcoded.

---

# 81. Admin Website Content Management

Admin should eventually control:

```text
Announcement Bar
Homepage Hero
Homepage Sections
Footer Text
Contact Information
Social Links
Shipping Message
About Content
FAQ
```

This reduces developer dependency.

---

# 82. Social Media

Admin-controlled links:

```text
Instagram
Facebook
TikTok
WhatsApp
YouTube
```

Only show configured social platforms.

---

# 83. Analytics

Architecture should support future analytics.

Track:

```text
Product Views
Add to Cart
Checkout Started
Order Submitted
Orders Accepted
Orders Rejected
Searches
```

This can later integrate with:

```text
Google Analytics
Meta Pixel
Google Tag Manager
```

---

# 84. Search

Search should support:

```text
Product Name
Brand
Category
Tags
SKU
```

Example:

```text
Search:
"serum"
```

Results:

```text
Vitamin C Serum
Niacinamide Serum
Hair Serum
```

Search should be case-insensitive.

---

# 85. Filtering

Shop filters:

```text
Category
Brand
Price
Availability
Rating
Concern
Product Type
```

Filters should be dynamically generated where possible.

---

# 86. Pagination

Product listings should not load thousands of products at once.

Use:

```text
Pagination
```

or:

```text
Infinite Scroll
```

Recommended for SEO-friendly category pages:

```text
Pagination
```

---

# 87. Accessibility

The website should follow accessibility best practices.

Requirements:

* Semantic HTML
* Keyboard navigation
* Accessible forms
* Labels
* Alt text
* Sufficient contrast
* Focus states
* Screen-reader-friendly controls
* Accessible modal/dialog behavior

---

# 88. Testing

Testing should cover:

## Customer

```text
Homepage
Shop
Search
Filtering
Product details
Cart
Checkout
Order submission
Order success
Authentication
Wishlist
Queries
Reviews
```

## Admin

```text
Login
Dashboard
Product creation
Product editing
Category creation
Brand creation
Inventory
Order review
Accept order
Reject order
Customer management
Query management
Review management
```

---

# 89. Critical Test Cases

### Product

```text
Create product
Edit product
Delete product
Publish product
Unpublish product
Upload images
Set sale price
Set stock
```

### Cart

```text
Add product
Increase quantity
Decrease quantity
Remove product
Empty cart
Out-of-stock product
```

### Order

```text
Submit valid order
Submit invalid order
Empty cart checkout
Product becomes unavailable
Admin accepts order
Admin rejects order
Admin changes status
```

### Security

```text
Customer cannot access admin
Admin cannot access unauthorized resources
Unauthorized API requests rejected
Invalid data rejected
```

---

# 90. MVP Scope

## Phase 1 — Foundation

```text
Next.js setup
TypeScript
Tailwind
Supabase
Authentication
Database
Admin authentication
Basic UI system
```

---

# 91. Phase 2 — Product System

```text
Products
Categories
Brands
Product images
Product details
Inventory
Product search
Filtering
Collections
```

---

# 92. Phase 3 — Customer Store

```text
Homepage
Shop
Category pages
Product pages
Cart
Checkout
Customer information
Order submission
Thank you page
```

---

# 93. Phase 4 — Admin Order System

```text
Admin dashboard
Orders
Order details
Order review
Accept order
Reject order
Order status
Order history
Customer management
```

---

# 94. Phase 5 — Queries & Reviews

```text
Contact form
Admin queries
Admin replies
Reviews
Review moderation
```

---

# 95. Phase 6 — CMS

```text
Homepage management
Announcement bar
Collections
Website settings
Social links
FAQ
About page
```

---

# 96. Phase 7 — Advanced Features

Future:

```text
Online payment
WhatsApp integration
Email notifications
SMS
Coupons
Discounts
Advanced analytics
Abandoned carts
Product recommendations
Customer loyalty
Subscriptions
Multi-brand support
```

---

# 97. Future Scalability

The system must support:

```text
100+ products
1,000+ products
10,000+ customers
Multiple brands
Multiple categories
Multiple product types
Product variants
Multiple collections
```

Database queries should be indexed appropriately.

---

# 98. Product Flexibility Requirement

This is a mandatory requirement.

The application must NOT contain logic such as:

```text
if product.name === "Clearix"
```

or:

```text
if brand === "Clearix"
```

for core functionality.

The system must use:

```text
product
brand
category
subcategory
collection
tags
```

relationships.

---

# 99. Content Flexibility Requirement

All customer-facing product information should come from the database.

Do not hardcode:

```text
Product names
Product prices
Product descriptions
Product images
Ingredients
Benefits
Categories
Brands
Stock
```

Admin must be able to update these without code changes.

---

# 100. Admin-First Product Management

The final product workflow should be:

```text
Admin Login
     |
     v
Products
     |
     v
Add Product
     |
     v
Upload Image
     |
     v
Enter Details
     |
     v
Set Price
     |
     v
Set Stock
     |
     v
Select Category
     |
     v
Select Brand
     |
     v
Publish
     |
     v
Product Automatically Appears
on Customer Website
```

---

# 101. Customer-to-Admin Order Workflow

```text
Customer
   |
   | Select Product
   v
Cart
   |
   | Checkout
   v
Order Request
   |
   v
Admin Dashboard
   |
   | Review
   |
   +-------------------+
   |                   |
   v                   v
Accept               Reject
   |                   |
   v                   v
Accepted             Rejected
   |
   v
Confirmed
```

---

# 102. Important Business Rule

An order submitted by the customer should initially be:

```text
PENDING
```

It should NOT automatically become:

```text
CONFIRMED
```

Only the admin can confirm/accept it.

---

# 103. Pricing Rule

The customer's initial cart total should be stored as the original requested amount.

Admin can later modify:

```text
Delivery Fee
Discount
Final Total
```

The system should preserve both:

```text
Original Amount
Final Accepted Amount
```

This provides a clear quotation history.

---

# 104. Inventory Rule

When a customer submits an order:

Option A:

```text
Do not permanently reduce stock
until admin accepts.
```

Recommended for the initial quotation model.

After acceptance:

```text
Reserve / deduct inventory.
```

This avoids stock being consumed by rejected requests.

---

# 105. Product Deletion Rule

Do not permanently delete products that have historical orders.

Instead:

```text
ARCHIVED
```

Historical orders must continue showing the product information that existed at the time of purchase.

---

# 106. Data Integrity

Order items should store snapshots of:

```text
Product Name
SKU
Price
Quantity
Variant
```

This prevents future product edits from changing historical orders.

---

# 107. Admin Audit Trail

Important admin actions should optionally be logged:

```text
Product Created
Product Updated
Price Changed
Stock Updated
Order Accepted
Order Rejected
Order Status Changed
Review Approved
Query Resolved
```

Future audit table:

```text
admin_activity_logs
```

---

# 108. Deployment

Recommended:

```text
Frontend / Backend:
Vercel

Database:
Supabase

Storage:
Supabase Storage

Domain:
silksoul.com
```

Production environment:

```text
Production
Preview
Development
```

---

# 109. Git Workflow

Recommended branches:

```text
main
develop
feature/*
fix/*
```

Example:

```text
feature/product-management
feature/checkout
feature/admin-orders
fix/cart-calculation
```

---

# 110. Code Quality

Requirements:

* TypeScript strict mode
* Reusable components
* No duplicated business logic
* Clear naming
* Server-side authorization
* Proper error handling
* Consistent formatting
* ESLint
* Prettier
* Meaningful commits

---

# 111. Definition of Done

A feature is complete only when:

```text
UI implemented
+
Responsive
+
Database integrated
+
Validation implemented
+
Error handling implemented
+
Loading states implemented
+
Authorization implemented
+
Tested
```

---

# 112. MVP Acceptance Criteria

The SilkSoul MVP is considered complete when:

### Customer

* Customer can browse products.
* Customer can search products.
* Customer can filter products.
* Customer can view product details.
* Customer can add products to cart.
* Customer can modify cart quantities.
* Customer can remove products.
* Customer can enter customer information.
* Customer can submit an order request.
* Customer receives an order number.
* Customer sees a thank-you page.
* Customer can view order status if authenticated.
* Customer can submit queries.

### Admin

* Admin can log in securely.
* Admin can view dashboard statistics.
* Admin can create products.
* Admin can edit products.
* Admin can archive products.
* Admin can upload product images.
* Admin can manage categories.
* Admin can manage brands.
* Admin can manage collections.
* Admin can manage inventory.
* Admin can view all orders.
* Admin can view order details.
* Admin can accept orders.
* Admin can reject orders.
* Admin can update order statuses.
* Admin can view customers.
* Admin can view customer queries.
* Admin can reply to queries.
* Admin can manage reviews.
* Admin can manage website content.

---

# 113. Non-Goals for Initial MVP

The following are not required for the first version:

```text
Advanced loyalty program
Subscription billing
Complex payment system
Multi-vendor marketplace
Warehouse management
Advanced shipping API
AI recommendations
Advanced analytics
Multi-language support
Multi-currency
```

These should remain possible through scalable architecture.

---

# 114. Future Roadmap

## Version 1.0

```text
Product Catalog
Cart
Checkout
Order Requests
Admin Dashboard
Accept / Reject
Queries
Reviews
```

## Version 1.1

```text
Email notifications
WhatsApp
Customer accounts
Order tracking
Coupons
```

## Version 1.2

```text
Online payments
Shipping integration
Advanced inventory
```

## Version 2.0

```text
AI Product Recommendations
Personalized Shopping
Subscriptions
Loyalty Program
Advanced Analytics
Multi-brand Catalog
```

---

# 115. Final Product Architecture

```text
                         SILKSOUL
                            |
             +--------------+--------------+
             |                             |
             v                             v
       CUSTOMER STORE                ADMIN DASHBOARD
             |                             |
       +-----+------+              +-------+--------+
       |            |              |       |        |
     Products      Cart         Products Orders  Customers
       |            |              |       |        |
 Categories      Checkout       Brands   Queries  Reviews
 Brands             |            Stock   Content
 Collections        |            CMS
       |             |
       +------+------+
              |
              v
        ORDER REQUEST
              |
              v
        ADMIN REVIEW
              |
        +-----+-----+
        |           |
        v           v
     ACCEPT       REJECT
        |
        v
    CONFIRMED
        |
        v
    PROCESSING
        |
        v
      SHIPPED
        |
        v
     DELIVERED
```

---

# 116. Core Principle

The entire SilkSoul platform must follow this principle:

> **SilkSoul is the platform. Clearix is only one product/brand currently available on the platform.**

The architecture must therefore be:

```text
SilkSoul
│
├── Brands
│   ├── Clearix
│   ├── SilkSoul
│   └── Future Brands
│
├── Categories
│   ├── Skincare
│   ├── Hair Care
│   ├── Herbal Care
│   ├── Body Care
│   └── Wellness
│
├── Products
│   ├── Clearix Face Wash
│   ├── Clearix Serum
│   ├── Clearix Sunscreen
│   ├── Herbal Oil
│   ├── Herbal Shampoo
│   └── Future Products
│
└── Orders
    ├── Pending
    ├── Accepted
    ├── Rejected
    ├── Confirmed
    ├── Processing
    ├── Shipped
    └── Delivered
```

---

# 117. Final Development Goal

Build SilkSoul as a **production-ready, scalable, CMS-driven e-commerce platform**, not a static Clearix website.

The final system should allow a non-technical administrator to:

```text
Add a new product
        ↓
Upload images
        ↓
Set price
        ↓
Set stock
        ↓
Write description
        ↓
Add benefits
        ↓
Add ingredients
        ↓
Select category
        ↓
Select brand
        ↓
Publish
```

and immediately have that product available on the SilkSoul storefront.

The customer can then:

```text
Browse
→ Select Product
→ Add to Cart
→ Confirm Order
→ Fill Form
→ Submit Request
→ Receive Order Number
```

while the admin can:

```text
View Request
→ Review Products
→ Adjust Quotation
→ Accept / Reject
→ Update Status
→ Manage Customer
```

This architecture ensures that SilkSoul can start with **Clearix today** and evolve into a complete **beauty, skincare, haircare, herbal and personal-care e-commerce platform** without requiring a major rewrite.
