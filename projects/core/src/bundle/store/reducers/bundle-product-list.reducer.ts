/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BundleProductAction } from '../actions/bundle-product-list.action';
import { BundleActions } from '../actions/index';
import { BundleProductListState } from '../bundle-state';

export const initialState: BundleProductListState = {
  productList: [],
};

export function reducer(
  state = initialState,
  action: BundleProductAction
): BundleProductListState {
  switch (action.type) {
    case BundleActions.GET_BUNDLE_PRODUCTS_SUCCESS: {
      return {
        productList: [],
      };
    }
    case BundleActions.GET_BUNDLE_PRODUCTS_FAIL: {
      return {
        productList: [],
      };
    }
  }
  return state;
}
