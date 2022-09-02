/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '../multi-cart-state';
import {
  CartAddEntryFailPayload,
  CartAddEntryPayload,
  CartAddEntrySuccessPayload,
  CartRemoveEntryFailPayload,
  CartRemoveEntryPayload,
  CartRemoveEntrySuccessPayload,
  CartUpdateEntryFailPayload,
  CartUpdateEntryPayload,
  CartUpdateEntrySuccessPayload,
} from './cart-entry.action.model';

// TODO:#xxx - handle breaking changes

export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export class CartAddEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_ADD_ENTRY;
  constructor(public payload: CartAddEntryPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartAddEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_SUCCESS;
  constructor(public payload: CartAddEntrySuccessPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartAddEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_FAIL;
  constructor(public payload: CartAddEntryFailPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartRemoveEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_ENTRY;
  constructor(public payload: CartRemoveEntryPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartRemoveEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_SUCCESS;
  constructor(public payload: CartRemoveEntrySuccessPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartRemoveEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_FAIL;
  constructor(public payload: CartRemoveEntryFailPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartUpdateEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_UPDATE_ENTRY;
  constructor(public payload: CartUpdateEntryPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartUpdateEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_SUCCESS;
  constructor(public payload: CartUpdateEntrySuccessPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartUpdateEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_FAIL;
  constructor(public payload: CartUpdateEntryFailPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export type CartEntryAction =
  | CartAddEntry
  | CartAddEntrySuccess
  | CartAddEntryFail
  | CartRemoveEntry
  | CartRemoveEntrySuccess
  | CartRemoveEntryFail
  | CartUpdateEntry
  | CartUpdateEntrySuccess
  | CartUpdateEntryFail;
