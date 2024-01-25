/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';

export const MULTI_CART_FEATURE = 'cart';
export const MULTI_CART_DATA = '[Multi Cart] Multi Cart Data';

/**
 * Add voucher process const
 */
export const ADD_VOUCHER_PROCESS_ID = 'addVoucher';

export interface StateWithMultiCart {
  [MULTI_CART_FEATURE]: MultiCartState;
}

export interface MultiCartState {
  carts: StateUtils.EntityProcessesLoaderState<Cart | undefined>;
  index: {
    [cartType: string]: string;
  };
}
