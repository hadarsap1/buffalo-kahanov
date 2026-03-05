import type { Product, Category } from "@/types";

export const categories: Category[] = [
  { _id: "cat-cooking", name: "בישול ומעשנה", slug: "cooking", order: 1 },
  { _id: "cat-grill", name: "מנגל", slug: "grill", order: 2 },
];

const cookingCategory = categories[0];
const grillCategory = categories[1];

export const products: Product[] = [
  // בישול ומעשנה
  { _id: "p1", name: "אוסובוקו", slug: "ossobuco", category: cookingCategory, price: 68, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p2", name: "שורט ריבס", slug: "short-ribs", category: cookingCategory, price: 79, weightUnit: "kg", inStock: true, featured: true },
  { _id: "p3", name: 'כתף מס\' 4', slug: "shoulder-4", category: cookingCategory, price: 74, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p4", name: 'כתף מס\' 5', slug: "shoulder-5", category: cookingCategory, price: 95, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p5", name: "גולאש", slug: "goulash", category: cookingCategory, price: 74, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p6", name: "בריסקט", slug: "brisket", category: cookingCategory, price: 79, weightUnit: "kg", inStock: true, featured: true },
  { _id: "p7", name: "שייטל/שפיץ", slug: "shaytel-shpitz", category: cookingCategory, price: 105, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p8", name: "פיקניה", slug: "picanha", category: cookingCategory, price: 119, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p9", name: "בשר טחון", slug: "ground-meat", category: cookingCategory, price: 68, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p10", name: "ואסיו", slug: "vasio", category: cookingCategory, price: 95, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p11", name: "קוביות אסדו", slug: "asado-cubes", category: cookingCategory, price: 74, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p12", name: "אונטריב", slug: "untreib", category: cookingCategory, price: 95, weightUnit: "kg", inStock: true, featured: false },

  // מנגל
  { _id: "p13", name: "המבורגר 100% בופאלו", slug: "hamburger-buffalo", category: grillCategory, price: 78, weightUnit: "kg", inStock: true, featured: true },
  { _id: "p14", name: "טי-בון", slug: "t-bone", category: grillCategory, price: 145, weightUnit: "kg", inStock: true, featured: true },
  { _id: "p15", name: "סינטה עם עצם", slug: "sirloin-bone-in", category: grillCategory, price: 137, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p16", name: "מינוט סטייק סינטה", slug: "minute-steak-sirloin", category: grillCategory, price: 175, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p17", name: "אנטריקוט עם עצם", slug: "ribeye-bone-in", category: grillCategory, price: 145, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p18", name: "אנטריקוט ללא עצם", slug: "ribeye-boneless", category: grillCategory, price: 185, weightUnit: "kg", inStock: true, featured: true },
  { _id: "p19", name: "נקניקיות מרגז", slug: "merguez-sausages", category: grillCategory, price: 85, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p20", name: "נקניקיות צ'וריסו", slug: "chorizo-sausages", category: grillCategory, price: 85, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p21", name: "נקניקיות עשבי תיבול", slug: "herb-sausages", category: grillCategory, price: 85, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p22", name: "פילה", slug: "fillet", category: grillCategory, price: 220, weightUnit: "kg", inStock: true, featured: true },
  { _id: "p23", name: "סינטה", slug: "sirloin", category: grillCategory, price: 175, weightUnit: "kg", inStock: true, featured: false },
  { _id: "p24", name: "דנוור", slug: "denver", category: grillCategory, price: 110, weightUnit: "kg", inStock: true, featured: false },
];
