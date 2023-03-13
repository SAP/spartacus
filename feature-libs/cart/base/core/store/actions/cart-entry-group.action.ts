/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const ADD_TO_ENTRY_GROUP = '[Cart] Add To Entry Group';
export const ADD_TO_ENTRY_GROUP_SUCCESS = '[Cart] Add To Entry Group Success';
export const ADD_TO_ENTRY_GROUP_FAIL = '[Cart] Add To Entry Group Fail';
export const ADD_ENTRIES_TO_ENTRY_GROUPS = '[Cart] Add Entries To Entry Groups';
export const ADD_ENTRIES_TO_ENTRY_GROUPS_SUCCESS =
  '[Cart] Add Entries To Entry Groups Success';
export const ADD_ENTRIES_TO_ENTRY_GROUPS_FAIL =
  '[Cart] Add Entries To Entry Groups Fail';
export const REMOVE_ENTRY_GROUP = '[Cart] Remove Entry Group';
export const REMOVE_ENTRY_GROUP_SUCCESS = '[Cart] Remove Entry Group Success';
export const REMOVE_ENTRY_GROUP_FAIL = '[Cart] Remove Entry Group Fail';

export class AddToEntryGroup extends StateUtils.EntityProcessesIncrementAction {
  readonly type = ADD_TO_ENTRY_GROUP;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entry: OrderEntry;
      entryGroupNumber: number;
      quantity: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class AddToEntryGroupSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = ADD_TO_ENTRY_GROUP_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      deliveryModeChanged: boolean;
      entry: OrderEntry;
      entryGroupNumber: number;
      quantity: number;
      quantityAdded: number;
      statusCode: string;
      statusMessage: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class AddToEntryGroupFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = ADD_TO_ENTRY_GROUP_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entry: OrderEntry;
      entryGroupNumber: number;
      error: any;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class RemoveEntryGroup extends StateUtils.EntityProcessesIncrementAction {
  readonly type = REMOVE_ENTRY_GROUP;
  constructor(
    public payload: { cartId: string; userId: string; entryGroupNumber: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class RemoveEntryGroupSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = REMOVE_ENTRY_GROUP_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; entryGroupNumber: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class RemoveEntryGroupFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = REMOVE_ENTRY_GROUP_FAIL;
  constructor(
    public payload: {
      error: any;
      cartId: string;
      userId: string;
      entryGroupNumber: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export type CartEntryGroupAction =
  | AddToEntryGroup
  | AddToEntryGroupSuccess
  | AddToEntryGroupFail
  | RemoveEntryGroup
  | RemoveEntryGroupSuccess
  | RemoveEntryGroupFail;
