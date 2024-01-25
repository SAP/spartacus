/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { ADD_VOUCHER_PROCESS_ID, MULTI_CART_DATA } from '../multi-cart-state';

export const CART_ADD_VOUCHER = '[Cart-voucher] Add Cart Vouchers';
export const CART_ADD_VOUCHER_FAIL = '[Cart-voucher] Add Cart Voucher Fail';
export const CART_ADD_VOUCHER_SUCCESS =
  '[Cart-voucher] Add Cart Voucher Success';
export const CART_RESET_ADD_VOUCHER = '[Cart-voucher] Reset Add Cart Voucher';

export const CART_REMOVE_VOUCHER = '[Cart-voucher] Remove Cart Voucher';
export const CART_REMOVE_VOUCHER_FAIL =
  '[Cart-voucher] Remove Cart Voucher Fail';
export const CART_REMOVE_VOUCHER_SUCCESS =
  '[Cart-voucher] Remove Cart Voucher Success';

// Adding cart voucher actions
export class CartAddVoucher extends StateUtils.EntityLoadAction {
  readonly type = CART_ADD_VOUCHER;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

export class CartAddVoucherFail extends StateUtils.EntityFailAction {
  readonly type = CART_ADD_VOUCHER_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      voucherId: string;
      error: any;
    }
  ) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID, payload.error);
  }
}

export class CartAddVoucherSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CART_ADD_VOUCHER_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

/**
 * Resets add voucher process
 */
export class CartResetAddVoucher extends StateUtils.EntityLoaderResetAction {
  readonly type = CART_RESET_ADD_VOUCHER;
  constructor() {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

// Deleting cart voucher
export class CartRemoveVoucher extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_VOUCHER;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartRemoveVoucherFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_VOUCHER_FAIL;
  constructor(
    public payload: {
      error: any;
      cartId: string;
      userId: string;
      voucherId: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartRemoveVoucherSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_VOUCHER_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

// action types
export type CartVoucherAction =
  | CartAddVoucher
  | CartAddVoucherFail
  | CartAddVoucherSuccess
  | CartResetAddVoucher
  | CartRemoveVoucher
  | CartRemoveVoucherFail
  | CartRemoveVoucherSuccess;
