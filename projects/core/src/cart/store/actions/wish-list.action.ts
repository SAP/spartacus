import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { getCartIdByUserId } from '../../utils/utils';
import { MULTI_CART_FEATURE } from '../multi-cart-state';

export const CREATE_WISH_LIST = '[Wish List] Create Wish List';
export const CREATE_WISH_LIST_FAIL = '[Wish List] Create Wish List Fail';
export const CREATE_WISH_LIST_SUCCESS = '[Wish List] Create Wish List Success';

export const LOAD_WISH_LIST = '[Wish List] Load Wish List';
export const LOAD_WISH_LIST_SUCCESS = '[Wish List] Load Wish List Success';

export const RESET_WISH_LIST_DETAILS = '[Wish List] Reset Wish List';

export class CreateWishList extends EntityLoadAction {
  readonly type = CREATE_WISH_LIST;
  constructor(
    public payload: {
      userId: string;
      name?: string;
      description?: string;
    }
  ) {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateWishListSuccess extends EntitySuccessAction {
  readonly type = CREATE_WISH_LIST_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class CreateWishListFail extends EntityFailAction {
  readonly type = CREATE_WISH_LIST_FAIL;
  constructor(public payload: { cartId: string; error?: any }) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class LoadWisthList implements Action {
  readonly type = LOAD_WISH_LIST;
  constructor(public payload: string) {}
}

export class LoadWisthListSuccess extends EntitySuccessAction {
  readonly type = LOAD_WISH_LIST_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData?: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class ResetWishListDetails extends EntityResetAction {
  readonly type = RESET_WISH_LIST_DETAILS;
  constructor() {
    super(MULTI_CART_FEATURE, undefined);
  }
}

export type WishListActions =
  | CreateWishList
  | CreateWishListSuccess
  | CreateWishListFail
  | LoadWisthList
  | LoadWisthListSuccess
  | ResetWishListDetails;
