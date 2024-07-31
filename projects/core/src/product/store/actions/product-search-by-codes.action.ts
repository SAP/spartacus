/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';
import { EntityScopedLoaderActions } from '../../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY } from '../product-state';

export const SEARCH_PRODUCT_BY_CODE = '[Product] Search Product By Code';
export const SEARCH_PRODUCT_BY_CODE_SUCCESS =
  '[Product] Search Product By Code Success';
export const SEARCH_PRODUCT_BY_CODE_FAIL =
  '[Product] Search Product By Code Fail';

export class SearchProductByCode extends EntityScopedLoaderActions.EntityScopedLoadAction {
  readonly type = SEARCH_PRODUCT_BY_CODE;
  constructor(
    public payload: {
      code: string;
      scope: string;
    }
  ) {
    super(PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY, payload.code, payload.scope);
  }
}

export class SearchProductByCodeSuccess extends EntityScopedLoaderActions.EntityScopedSuccessAction {
  readonly type = SEARCH_PRODUCT_BY_CODE_SUCCESS;
  constructor(payload: { product: Product; code: string; scope: string }) {
    super(
      PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
      payload.code,
      payload.scope,
      payload.product
    );
  }
}

export class SearchProductByCodeFail extends EntityScopedLoaderActions.EntityScopedFailAction {
  readonly type = SEARCH_PRODUCT_BY_CODE_FAIL;
  constructor(payload: { code: string; scope: string; error: any }) {
    super(
      PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
      payload.code,
      payload.scope,
      payload.error
    );
  }
}

// action types
export type ProductSearchByCodesAction =
  | SearchProductByCode
  | SearchProductByCodeSuccess
  | SearchProductByCodeFail;
