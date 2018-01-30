import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProductsSearch from './product-search.reducer';
import * as fromProduct from './product.reducer';
import * as fromProductReviews from './product-reviews.reducer';

export interface ProductsState {
  textSearch: fromProductsSearch.ProductsSearchState;
  details: fromProduct.ProductState;
  reviews: fromProductReviews.ProductReviewsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  textSearch: fromProductsSearch.reducer,
  details: fromProduct.reducer,
  reviews: fromProductReviews.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
