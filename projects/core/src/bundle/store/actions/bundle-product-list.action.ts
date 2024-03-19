/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ProductSearchPage } from '@spartacus/core';

export const GET_BUNDLE_PRODUCTS = '[Bundle] Load Products in Bundle';
export const GET_BUNDLE_PRODUCTS_FAIL = '[Bundle] Load Products in Bundle Fail';
export const GET_BUNDLE_PRODUCTS_SUCCESS = '[Bundle] Load Products in Bundle Success';

export class GetBundleProducts implements Action {
  readonly type = GET_BUNDLE_PRODUCTS;
  constructor(
    public cartId: string,
    public userId: string,
    public entryGroupNumber: int
  ) {}
}

export class GetBundleProductsSucceed implements Action {
  readonly type = GET_BUNDLE_PRODUCTS_SUCCESS;
  constructor(public payload: ProductSearchPage) {}
}

export class GetBundleProductsFailed implements Action {
  readonly type = GET_BUNDLE_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

// action types
export type BundleProductAction =
  | GetBundleProducts
  | GetBundleProductsSucceed
  | GetBundleProductsFailed;
