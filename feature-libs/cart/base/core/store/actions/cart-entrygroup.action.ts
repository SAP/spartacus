/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { MULTI_CART_DATA } from '../multi-cart-state';
import { ErrorAction } from '@spartacus/core';

export const CART_REMOVE_ENTRYGROUP = '[Cart-entrygroup] Remove EntryGroup';
export const CART_REMOVE_ENTRYGROUP_SUCCESS = '[Cart-entrygroup] Remove EntryGroup Success';
export const CART_REMOVE_ENTRYGROUP_FAIL = '[Cart-entrygroup] Remove EntryGroup Fail';

export const CART_ADD_TO_ENTRYGROUP = '[Cart-entrygroup] Add to EntryGroup';
export const CART_ADD_TO_ENTRYGROUP_SUCCESS = '[Cart-entrygroup] Add to EntryGroup Success';
export const CART_ADD_TO_ENTRYGROUP_FAIL = '[Cart-entrygroup] Add to EntryGroup Fail';

export class CartRemoveEntryGroup extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_ENTRYGROUP;
  constructor(
    public payload: { cartId: string; userId: string; entryGroupNumber: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartRemoveEntryGroupSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRYGROUP_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; entryGroupNumber: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartRemoveEntryGroupFail extends StateUtils.EntityProcessesDecrementAction implements ErrorAction {
  readonly type = CART_REMOVE_ENTRYGROUP_FAIL;
  constructor(
    public payload: { error: any; cartId: string; userId: string; entryGroupNumber: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
  get error() {
    return this.payload.error;
  }
}

export class CartAddToEntryGroup extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_ADD_TO_ENTRYGROUP;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      entryGroupNumber: number;
      productCode: string;
      quantity: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartAddToEntryGroupSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_ADD_TO_ENTRYGROUP_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entryGroupNumber: number;
      productCode: string;
      quantity: number;
      entry?: OrderEntry;
      quantityAdded?: number;
      statusCode?: string;
      statusMessage?: string;
     }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartAddToEntryGroupFail extends StateUtils.EntityProcessesDecrementAction implements ErrorAction {
  readonly type = CART_ADD_TO_ENTRYGROUP_FAIL;
  constructor(
    public payload: { error: any; userId: string; cartId: string; entryGroupNumber: number; productCode: string; quantity: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
  get error() {
    return this.payload.error;
  }
}

export type CartEntryGroupAction =
  | CartRemoveEntryGroup
  | CartRemoveEntryGroupSuccess
  | CartRemoveEntryGroupFail
  | CartAddToEntryGroup
  | CartAddToEntryGroupSuccess
  | CartAddToEntryGroupFail;
