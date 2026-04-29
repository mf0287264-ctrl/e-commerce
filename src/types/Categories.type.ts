export interface SubCategoryType {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface SubCategoriesResponse {
  results: number;
  metadata: Metadata;
  data: SubCategoryType[];
}
