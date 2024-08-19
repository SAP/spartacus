/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { StateUtils } from '../../../state/utils/index';
import { EntityScopedLoaderState } from '../../../state/utils/scoped-loader/scoped-loader.state';
import { ProductsState, StateWithProduct } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductSearchByCodeState: MemoizedSelector<
  StateWithProduct,
  EntityScopedLoaderState<Product>
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.searchByCode
);

export const getSelectedProductSearchByCodeStateFactory = (payload: {
  code: string;
  scope: string;
}): MemoizedSelector<StateWithProduct, StateUtils.LoaderState<Product>> => {
  return createSelector(
    getProductSearchByCodeState,
    (productSearchByCodeResults) =>
      (
        StateUtils.entityLoaderStateSelector(
          productSearchByCodeResults,
          payload.code
        ) as any
      )[payload.scope] || StateUtils.initialLoaderState
  );
};
