import { ProductType } from "./Product.type";
export interface CartProduct {
  count: number;
  _id: string;
  price: number;
  product: ProductType;
}

export interface CartType {
  cartId: string;
  status: string;
  message: string;
  numOfCartItems: number;
  data: {
    cartOwner: string;
    createdAt: string;
    updatedAt: string;
    products: CartProduct[];
    totalCartPrice: number;
    __v: number;
    _id: string;
  };
}
