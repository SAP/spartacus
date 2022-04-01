import { OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const ADD_TO_ENTRY_GROUP = '[Cart] Add To Entry Group';
export const ADD_TO_ENTRY_GROUP_SUCCESS = '[Cart] Add To Entry Group Success';
export const ADD_TO_ENTRY_GROUP_FAIL = '[Cart] Add To Entry Group Fail';
export const DELETE_ENTRY_GROUP = '[Cart] Delete Entry Group';
export const DELETE_ENTRY_GROUP_SUCCESS = '[Cart] Delete Entry Group Success';
export const DELETE_ENTRY_GROUP_FAIL = '[Cart] Delete Entry Group Fail';

export class AddToEntryGroup extends StateUtils.EntityProcessesIncrementAction {
  readonly type = ADD_TO_ENTRY_GROUP;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entry: OrderEntry;
      entryGroupNumber: number;
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

export class DeleteEntryGroup extends StateUtils.EntityProcessesIncrementAction {
  readonly type = DELETE_ENTRY_GROUP;
  constructor(
    public payload: { cartId: string; userId: string; entryGroupNumber: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class DeleteEntryGroupSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = DELETE_ENTRY_GROUP_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; entryGroupNumber: number }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class DeleteEntryGroupFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = DELETE_ENTRY_GROUP_FAIL;
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
  | DeleteEntryGroup
  | DeleteEntryGroupSuccess
  | DeleteEntryGroupFail;
