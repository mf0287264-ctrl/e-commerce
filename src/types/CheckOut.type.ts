import { BrandType, CategoryType, SubCategoryType } from "./Product.type";

export interface OnlineOrderResponse {
  status: string;
  session: {
    cancel_url: string;
    success_url: string;
    url: string;
  };
}
export interface OrderResponse {
  status: string;
  message: string;
  user: OrderUser;
  pricing: OrderPricing;
  data: OrderData;
}

export interface OrderUser {
  id: string;
  name: string;
  email: string;
}

export interface OrderPricing {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
}

export interface OrderData {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderDataUser;
  cartItems: OrderCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export interface OrderDataUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderCartItem {
  count: number;
  _id: string;
  price: number;
  product: OrderProduct;
}

export interface OrderProduct {
  subcategory: SubCategoryType[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: CategoryType;
  brand: BrandType;
  ratingsAverage: number;
  id: string;
}
