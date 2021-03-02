import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { SAVED_CART_SAVE_CART_PROCESS_ID } from '../saved-cart-state';

export const SAVE_CART = '[Saved Cart] Save Cart';
export const SAVE_CART_SUCCESS = '[Saved Cart] Save Cart Success';
export const SAVE_CART_FAIL = '[Saved Cart] Save Cart Fail';

export class SaveCart extends StateUtils.EntityLoadAction {
  readonly type = SAVE_CART;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      saveCartName?: string;
      saveCartDescription?: string;
      extraData?: {
        edit: boolean;
      };
    }
  ) {
    super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
  }
}

export class SaveCartSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SAVE_CART_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
  }
}

export class SaveCartFail extends StateUtils.EntityFailAction {
  readonly type = SAVE_CART_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID, payload);
  }
}

export type SavedCartActions = SaveCart | SaveCartSuccess | SaveCartFail;
