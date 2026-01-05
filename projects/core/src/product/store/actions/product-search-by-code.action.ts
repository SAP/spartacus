/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorAction } from '../../../error-handling';
import { Product } from '../../../model/product.model';
import { StateUtils } from '../../../state/utils';
import { EntityScopedLoaderActions } from '../../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY } from '../product-state';

export const PRODUCT_SEARCH_LOAD_BY_CODE =
  '[Product] Product Search Load By Code';
export const PRODUCT_SEARCH_LOAD_BY_CODE_SUCCESS =
  '[Product] Product Search Load By Code Success';
export const PRODUCT_SEARCH_LOAD_BY_CODE_FAIL =
  '[Product] Product Search Load By Code Fail';
export const CLEAR_PRODUCT_SEARCH_BY_CODE_STATE =
  '[Product] Clear Product Search By Code State';

export class ProductSearchLoadByCode extends EntityScopedLoaderActions.EntityScopedLoadAction {
  readonly type = PRODUCT_SEARCH_LOAD_BY_CODE;
  constructor(
    public payload: {
      code: string;
      scope: string;
    }
  ) {
    super(PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY, payload.code, payload.scope);
  }
}

export class ProductSearchLoadByCodeSuccess extends EntityScopedLoaderActions.EntityScopedSuccessAction {
  readonly type = PRODUCT_SEARCH_LOAD_BY_CODE_SUCCESS;
  constructor(payload: { product: Product; code: string; scope: string }) {
    super(
      PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
      payload.code,
      payload.scope,
      payload.product
    );
  }
}

export class ProductSearchLoadByCodeFail
  extends EntityScopedLoaderActions.EntityScopedFailAction
  implements ErrorAction
{
  readonly type = PRODUCT_SEARCH_LOAD_BY_CODE_FAIL;
  constructor(payload: { code: string; scope: string; error: any }) {
    super(
      PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
      payload.code,
      payload.scope,
      payload.error
    );
  }
}

export class ClearProductSearchByCodeState extends StateUtils.EntityRemoveAllAction {
  readonly type = CLEAR_PRODUCT_SEARCH_BY_CODE_STATE;
  constructor() {
    super(PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY);
  }
}

// action types
export type ProductSearchByCodeAction =
  | ProductSearchLoadByCode
  | ProductSearchLoadByCodeSuccess
  | ProductSearchLoadByCodeFail
  | ClearProductSearchByCodeState;
