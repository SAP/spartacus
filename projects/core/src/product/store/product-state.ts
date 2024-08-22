/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ProductSearchPage,
  Suggestion,
} from '../../model/product-search.model';
import { Product, ProductReference, Review } from '../../model/product.model';
import { EntityScopedLoaderState } from '../../state/utils/scoped-loader/scoped-loader.state';

export const PRODUCT_FEATURE = 'product';
export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';
export const PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY =
  '[Product] Search Results By Codes Entity';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductsState;
}

export interface ProductsState {
  details: EntityScopedLoaderState<Product>;
  search: ProductsSearchState;
  searchByCode: EntityScopedLoaderState<Product>;
  reviews: ProductReviewsState;
  references: ProductReferencesState;
}

export interface ProductsSearchState {
  results: ProductSearchPage;
  suggestions: Suggestion[];
  auxResults: ProductSearchPage;
}

export interface ProductReviewsState {
  productCode: string;
  list: Review[];
}

export interface ProductReferencesState {
  productCode: string;
  list: ProductReference[];
}
