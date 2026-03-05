# Buffalo Kahanov (בופלו כהנוב) — Project Blueprint

## Overview
Premium meat boutique e-commerce site. Hebrew RTL. Order via WhatsApp.

## Tech Stack
| Layer       | Tech                          |
|-------------|-------------------------------|
| Framework   | Next.js 15 (App Router)       |
| Styling     | Tailwind CSS + Shadcn UI      |
| CMS         | Sanity.io (Studio embedded)   |
| State       | Zustand (cart, localStorage)  |
| Icons       | Lucide-react                  |
| Language    | Hebrew, full RTL              |

## Design Tokens
```
Primary Red:    #800000 (deep maroon)
Dark BG:        #1a1a1a
Card BG:        #2a2a2a
Surface:        #333333
Text Primary:   #ffffff
Text Secondary: #a0a0a0
Accent Gold:    #c9a96e (premium feel)
Sale Red:       #dc2626
```

## File Structure (Target)
```
src/
├── app/
│   ├── layout.tsx              # Root: RTL, Hebrew font, metadata
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind + custom vars
│   ├── products/
│   │   └── page.tsx            # Product catalog with filters
│   ├── checkout/
│   │   └── page.tsx            # Checkout → WhatsApp
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx        # Embedded Sanity Studio
│
├── components/
│   ├── ui/                     # Shadcn (already installed)
│   ├── layout/
│   │   ├── Header.tsx          # Logo + nav + cart icon
│   │   └── Footer.tsx          # Contact info, social
│   ├── home/
│   │   ├── Hero.tsx            # Full-width hero banner
│   │   ├── OurStory.tsx        # About section
│   │   └── FeaturedProducts.tsx# Grid of featured items
│   ├── products/
│   │   ├── ProductCard.tsx     # Single product card
│   │   ├── ProductGrid.tsx     # Grid layout
│   │   └── CategoryFilter.tsx  # Filter bar
│   └── cart/
│       ├── CartSheet.tsx       # Slide-out cart panel
│       ├── CartItem.tsx        # Single cart line item
│       └── CartSummary.tsx     # Total + checkout button
│
├── lib/
│   ├── utils.ts                # Shadcn utils (exists)
│   ├── sanity/
│   │   ├── client.ts           # Sanity client config
│   │   ├── image.ts            # Image URL builder
│   │   └── queries.ts          # GROQ queries
│   └── store/
│       └── cart.ts             # Zustand cart store
│
├── sanity/
│   ├── sanity.config.ts        # Sanity Studio config
│   ├── sanity.cli.ts           # CLI config
│   ├── env.ts                  # Env vars helper
│   └── schemas/
│       ├── index.ts            # Schema barrel
│       ├── product.ts          # Product schema
│       └── category.ts         # Category schema
│
└── types/
    └── index.ts                # TypeScript interfaces
```

## Data Model

### Category
| Field    | Type   | Notes         |
|----------|--------|---------------|
| name     | string | Hebrew name   |
| slug     | slug   | URL-safe      |
| order    | number | Sort priority  |

### Product
| Field         | Type      | Notes                    |
|---------------|-----------|--------------------------|
| name          | string    | Hebrew name              |
| slug          | slug      | URL-safe                 |
| description   | text      | Short description        |
| image         | image     | Product photo            |
| category      | reference | → Category               |
| price         | number    | Price in ₪               |
| salePrice     | number    | Optional sale price      |
| weightUnit    | string    | "kg" or "unit" (יחידה)   |
| inStock       | boolean   | Toggle availability      |
| featured      | boolean   | Show on homepage         |

## Cart (Zustand + localStorage)
```ts
interface CartItem {
  id: string;       // Sanity document _id
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  weightUnit: string;
  image?: string;
}
```

## WhatsApp Checkout Flow
1. User fills: Name, Address, Special Instructions
2. Message formatted:
```
🥩 הזמנה חדשה - בופלו כהנוב

📋 פרטי הזמנה:
- אנטריקוט x2 — ₪180
- המבורגר ביתי x4 — ₪120

💰 סה"כ: ₪300

👤 שם: ישראל ישראלי
📍 כתובת: רחוב הרצל 1, תל אביב
📝 הערות: בלי חריף

תודה! 🙏
```
3. Opens `https://wa.me/972XXXXXXXXX?text=...`

## Build Phases
- [x] Phase 1: Project init, deps, Shadcn, blueprint
- [ ] Phase 2: Sanity schemas + config + embedded studio
- [ ] Phase 3: TypeScript types + Sanity client + queries
- [ ] Phase 4: Zustand cart store
- [ ] Phase 5: Layout (Header, Footer, RTL globals)
- [ ] Phase 6: Homepage (Hero, OurStory, FeaturedProducts)
- [ ] Phase 7: Product catalog page + filters
- [ ] Phase 8: Cart sheet + checkout page (WhatsApp)
- [ ] Phase 9: Polish, mobile testing, final review
