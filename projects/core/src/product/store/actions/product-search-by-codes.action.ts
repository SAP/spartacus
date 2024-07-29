/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';
import { EntityScopedLoaderActions } from '../../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY } from '../product-state';

export const SEARCH_PRODUCTS_BY_CODES = '[Product] Search Products By Codes';
export const SEARCH_PRODUCTS_BY_CODES_SUCCESS =
  '[Product] Search Products By Codes Success';
export const SEARCH_PRODUCTS_BY_CODES_FAIL =
  '[Product] Search Products By Codes Fail';

export class SearchProductsByCodes extends EntityScopedLoaderActions.EntityScopedLoadAction {
  readonly type = SEARCH_PRODUCTS_BY_CODES;
  constructor(
    public payload: {
      codes: string; // SPIKE! codes is a string, not an array of strings!! they are comma-separated
      scope: string;
    }
  ) {
    super(PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY, payload.codes, payload.scope);
  }
}

export class SearchProductsByCodesSuccess extends EntityScopedLoaderActions.EntityScopedSuccessAction {
  readonly type = SEARCH_PRODUCTS_BY_CODES_SUCCESS;
  constructor(payload: {
    products: Product[];
    codes: string; // SPIKE! codes is a string, not an array of strings!! they are comma-separated
    scope: string;
  }) {
    super(
      PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
      payload.codes,
      payload.scope,
      payload.products
    );
  }
}

export class SearchProductsByCodesFail extends EntityScopedLoaderActions.EntityScopedFailAction {
  readonly type = SEARCH_PRODUCTS_BY_CODES_FAIL;
  constructor(payload: {
    codes: string; // SPIKE! codes is a string, not an array of strings!! they are comma-separated
    scope: string;
    error: any;
  }) {
    super(
      PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
      payload.codes,
      payload.scope,
      payload.error
    );
  }
}

// action types
export type ProductSearchByCodesAction =
  | SearchProductsByCodes
  | SearchProductsByCodesSuccess
  | SearchProductsByCodesFail;
