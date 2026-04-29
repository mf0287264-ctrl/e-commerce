export interface ProductType {
  sold: number;
  images: string[];

  subcategory: SubCategoryType[];

  ratingsQuantity: number;
  _id: string;

  title: string;
  slug: string;
  description: string;

  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;

  category: CategoryType;
  brand: BrandType;

  ratingsAverage: number;

  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
  id: string;
}

interface User {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubCategoryType {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
