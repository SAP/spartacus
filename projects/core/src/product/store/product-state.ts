export const PRODUCT_FEATURE = 'product';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductState;
}

export interface ProductState {
  entities: {
    [productCode: string]: {
      loading: boolean;
      value: any;
    };
  };
}

export interface ProductsState {
  details: ProductState;
  search: ProductsSearchState;
  reviews: ProductReviewsState;
}

export interface ProductsSearchState {
  results: any;
  suggestions: any[];
  auxResults: any;
  loading: boolean;
}

export interface ProductReviewsState {
  productCode: string;
  list: any[];
}
