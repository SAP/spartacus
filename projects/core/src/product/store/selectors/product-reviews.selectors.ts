/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Review } from '../../../model/product.model';
import {
  ProductReviewsState,
  ProductsState,
  StateWithProduct,
} from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductReviewsState: MemoizedSelector<
  StateWithProduct,
  ProductReviewsState
> = createSelector(getProductsState, (state: ProductsState) => state.reviews);

export const getSelectedProductReviewsFactory = (
  productCode: string
): MemoizedSelector<StateWithProduct, Review[] | undefined> => {
  return createSelector(getProductReviewsState, (reviewData) => {
    if (reviewData.productCode === productCode) {
      return reviewData.list;
    }
    return undefined;
  });
};
