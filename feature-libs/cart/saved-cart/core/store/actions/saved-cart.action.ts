import { Cart } from '@spartacus/core';

export const SAVE_CART = '[SavedCarts] Save Cart';
export const SAVE_CART_FAIL = '[SavedCarts] Save Cart Fail';
export const SAVE_CART_SUCCESS = '[SavedCarts] Save Cart Success';

export class SaveCart {
  readonly type = SAVE_CART;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      cartDescription: string;
      cartName: string;
    }
  ) {}
}

export class SaveCartFail {
  readonly type = SAVE_CART_FAIL;
  constructor(public payload: { error: any }) {}
}

export class SaveCartSuccess {
  readonly type = SAVE_CART_SUCCESS;
  constructor(public payload: Cart) {}
}

export type SavedCartActions = SaveCart | SaveCartFail | SaveCartSuccess;
