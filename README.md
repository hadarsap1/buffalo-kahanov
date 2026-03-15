# Buffalo Kahanov — בופלו כהנוב

**Premium buffalo meat boutique e-commerce platform** | Built with [Claude Code](https://claude.ai/claude-code)

A full-featured storefront for a pasture-raised buffalo meat business in Israel. Browse products, manage a shopping cart, and place orders directly via WhatsApp — with an integrated admin dashboard and Sanity CMS.

## Features

### Storefront
- **Product Catalog** — Browsable grid with category filtering (steaks, burgers, roasts, etc.)
- **Product Cards** — Images, descriptions, pricing (with sale price support), stock status, weight units (kg/unit)
- **Shopping Cart** — Slide-out sheet with quantity adjustment, persistent via localStorage (Zustand)
- **Featured Products** — Homepage carousel of highlighted items
- **Brand Story** — "Our Story" section about pasture-raised buffalo

### WhatsApp Checkout
1. Select delivery zone (zone-specific fees)
2. Fill customer info (name, address, notes)
3. One-click sends a pre-formatted order to WhatsApp
4. Cart auto-clears after submission

### Admin Dashboard
- Password-protected at `/admin`
- Product management (add, edit, stock status, featured flag)
- Delivery zone configuration
- Embedded Sanity Studio at `/studio` for content management

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS 4 + Shadcn UI |
| CMS | Sanity.io (embedded studio) |
| Database | Neon Serverless (delivery zones) |
| State | Zustand (cart persistence) |
| Icons | Lucide React |
| Font | Heebo (Hebrew-optimized) |
| Language | TypeScript |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage (Hero, Featured, Our Story)
│   ├── products/page.tsx           # Product catalog
│   ├── checkout/page.tsx           # Checkout form + WhatsApp
│   ├── admin/                      # Admin dashboard, login, product CRUD
│   ├── studio/[[...tool]]/         # Embedded Sanity Studio
│   └── api/admin/upload/           # Image upload endpoint
├── components/
│   ├── layout/                     # Header (sticky nav, cart badge), Footer
│   ├── home/                       # Hero, FeaturedProducts, OurStory
│   ├── products/                   # ProductCard, CategoryFilter, ProductGrid
│   ├── cart/                       # CartSheet, CartItem, CartSummary
│   ├── checkout/                   # CheckoutForm
│   └── admin/                      # ProductTable, ProductForm, DeliveryZoneTable
├── lib/
│   ├── sanity/                     # Client, image builder, GROQ queries
│   ├── store/cart.ts               # Zustand cart store
│   ├── db/client.ts                # Neon database client
│   └── auth/admin.ts               # Admin authentication
├── sanity/schemas/                 # Product & Category schemas
└── types/index.ts                  # TypeScript interfaces
```

## Getting Started

```bash
npm install
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
```

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
SANITY_API_VERSION=...
NEON_DATABASE_URL=...
ADMIN_PASSWORD=...
```

## Design

- **Color Palette**: Maroon primary (`#5C1D2A`), gold accent (`#D4AF37`), dark background (`#1C1C1E`)
- Full Hebrew RTL support with Heebo font
- Mobile-first responsive design
- Shadcn UI components (Radix primitives + Tailwind)

## Deployment

Deployed on Vercel. Sanity content managed via embedded studio at `/studio`.
