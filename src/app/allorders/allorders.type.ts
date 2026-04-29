import {
  OrderCartItem,
  OrderDataUser,
  ShippingAddress,
} from "@/types/CheckOut.type";

export interface AllOrderType {
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
