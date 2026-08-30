export type MenuItem = {
  ItemID: string;
  Name: string;
  Description: string;
  Price: number;
  ImageURL?: string;
  Available: string; // "Y" or "N"
  Category: string;
};

export type Review = {
  Timestamp: string;
  Item: string;
  BuyerName: string;
  Comment: string;
  Rating: number;
};

export type ShopConfig = {
  id: string;
  name: string;
  tagline: string;
  seller: string;
  publicSheetId: string; // Google Sheet ID of the shop's Public Sheet (Menu + Reviews tabs)
};

export type OrderRequestPayload = {
  type: "orderRequest";
  shopId: string;
  itemId: string;
  qty: number;
  buyerName: string;
  contact: string;
  location: string;
  notes?: string;
  website?: string; // honeypot field, must stay empty
};

export type PaymentPayload = {
  type: "payment";
  shopId: string;
  orderCode: string;
  paymentMethod: "bKash" | "Cash";
  transactionId?: string;
  website?: string; // honeypot field
};

export type SellerSignupPayload = {
  type: "sellerSignup";
  name: string;
  contact: string;
  cuisine: string;
  notes?: string;
  website?: string; // honeypot field
};

export type ApiResponse =
  | { success: true; orderCode?: string }
  | { success: false; error: string };
