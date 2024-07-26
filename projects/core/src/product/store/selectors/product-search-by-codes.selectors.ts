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

export const getProductSearchByCodesState: MemoizedSelector<
  StateWithProduct,
  EntityScopedLoaderState<Product[]>
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.searchByCodes
);

export const getSelectedProductSearchByCodesStateFactory = (payload: {
  codes: string;
  scope: string;
}): MemoizedSelector<StateWithProduct, StateUtils.LoaderState<Product[]>> => {
  return createSelector(
    getProductSearchByCodesState,
    (productSearchByCodesResults) =>
      (
        StateUtils.entityLoaderStateSelector(
          productSearchByCodesResults,
          payload.codes
        ) as any
      )[payload.scope] || StateUtils.initialLoaderState
  );
};

export const getSelectedProductSearchByCodesFactory = (payload: {
  codes: string;
  scope: string;
}): MemoizedSelector<StateWithProduct, Product[]> => {
  return createSelector(
    getSelectedProductSearchByCodesStateFactory(payload),
    (getProductSearchByCodesState) =>
      StateUtils.loaderValueSelector(getProductSearchByCodesState)
  );
};

// SPIKE TODO - other selectors can be added later
