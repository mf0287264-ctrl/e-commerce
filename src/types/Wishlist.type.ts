import { ProductType } from "./Product.type";

export interface wishlistLogsType {
  status: string;
  count: number;
  data: ProductType[];
}
export interface deleteWishlistType {
  status: string;
  message: string;
  data: string[];
}
