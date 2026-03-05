export interface Category {
  _id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: SanityImage;
  imageUrl?: string;
  category: Category;
  price: number;
  salePrice?: number;
  weightUnit: "kg" | "unit";
  inStock: boolean;
  featured: boolean;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  weightUnit: string;
  imageUrl?: string;
}

export interface CheckoutFormData {
  name: string;
  address: string;
  notes: string;
}
