/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { StateUtils } from '../../../state/utils/index';
import { EntityScopedLoaderState } from '../../../state/utils/scoped-loader/scoped-loader.state';
import { ProductsState, StateWithProduct } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductSearchByCategoryState: MemoizedSelector<
  StateWithProduct,
  EntityScopedLoaderState<Product[]>
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.searchByCategory
);

export const getSelectedProductSearchByCategoryStateFactory = (payload: {
  categoryCode: string;
  scope: string;
}): MemoizedSelector<StateWithProduct, StateUtils.LoaderState<Product[]>> => {
  return createSelector(
    getProductSearchByCategoryState,
    (productSearchByCategoryResults) =>
      (
        StateUtils.entityLoaderStateSelector(
          productSearchByCategoryResults,
          payload.categoryCode
        ) as any
      )[payload.scope] || StateUtils.initialLoaderState
  );
};
