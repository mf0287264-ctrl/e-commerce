import { ProductType } from "./Product.type";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface BrandsResponse {
  results: number;
  metadata: Metadata;
  data: Brand[];
}
export interface SingleBrandResponse {
  data: Brand;
}
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface ProductsResponse {
  results: number;
  metadata: Metadata;
  data: ProductType[];
}
