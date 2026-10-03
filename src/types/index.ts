export type ProductCategory = 
  | 'All'
  | 'Jewelry'
  | 'Sunglasses'
  | 'Handbags'
  | 'Ladies Wear'
  | 'Perfume';

export interface Product {
  id: string;
  name: string;
  category: 'Jewelry' | 'Sunglasses' | 'Handbags' | 'Ladies Wear' | 'Perfume';
  price: number; // 0 for perfume
  formattedPrice: string;
  image: string;
  description: string;
  details?: string[];
  stockStatus?: 'In Stock' | 'Limited Stock';
  isPriceOnRequest?: boolean; // For perfume as requested by user
  whatsappInquiryText?: string;
  tagline?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  cityState: string;
  orderNotes?: string;
  acceptedTerms: boolean;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  paymentMethod: string;
}

export interface SocialLinks {
  tiktok: string;
  tiktokHandle: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  whatsappGroup: string;
}
