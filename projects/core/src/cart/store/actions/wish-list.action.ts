import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { getCartIdByUserId } from '../../utils/utils';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const CREATE_WISH_LIST = '[Wish List] Create Wish List';
export const CREATE_WISH_LIST_FAIL = '[Wish List] Create Wish List Fail';
export const CREATE_WISH_LIST_SUCCESS = '[Wish List] Create Wish List Success';

export const LOAD_WISH_LIST = '[Wish List] Load Wish List';
export const LOAD_WISH_LIST_SUCCESS = '[Wish List] Load Wish List Success';
export const LOAD_WISH_LIST_FAIL = '[Wish List] Load Wish List Fail';

export const RESET_WISH_LIST_DETAILS = '[Wish List] Reset Wish List';

export class CreateWishList implements Action {
  readonly type = CREATE_WISH_LIST;
  constructor(
    public payload: {
      userId: string;
      name: string;
      description?: string;
    }
  ) {}
}

export class CreateWishListSuccess extends EntitySuccessAction {
  readonly type = CREATE_WISH_LIST_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string }) {
    super(MULTI_CART_DATA, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class CreateWishListFail extends EntityFailAction {
  readonly type = CREATE_WISH_LIST_FAIL;
  constructor(public payload: { cartId: string; error?: any }) {
    super(MULTI_CART_DATA, payload.cartId, payload.error);
  }
}

interface LoadWishListPayload {
  userId: string;
  /**
   * Used to compute wishlist cart name and find it in list of all carts.
   */
  customerId: string;
  /**
   * When we try load wishlist for the first time we don't know cart id.
   * Instead we create temporary cart with id equal to wishlist name to keep track of loading/error state.
   */
  tempCartId: string;
}

export class LoadWishList extends EntityLoadAction {
  readonly type = LOAD_WISH_LIST;
  constructor(public payload: LoadWishListPayload) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

interface LoadWishListSuccessPayload {
  cart: Cart;
  userId: string;
  /**
   * When LoadWishListSuccess action was dispatched as an completion to LoadWishList action
   * we get temporary cartId that was used to keep track of loading state.
   * In case of loading wish list with known cartId this property will be empty.
   */
  tempCartId?: string;
  /**
   * Used to compute wishlist cart name and find it in list of all carts.
   * In case of loading wish list with known cartId this property will be empty.
   */
  customerId?: string;
  /**
   * Wish list cart id. Extracted from cart content (code property).
   */
  cartId: string;
}

export class LoadWishListSuccess extends EntitySuccessAction {
  readonly type = LOAD_WISH_LIST_SUCCESS;
  constructor(public payload: LoadWishListSuccessPayload) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

interface LoadWishListFailPayload {
  userId: string;
  /**
   * Used to compute wishlist cart name and find it in list of all carts.
   * In case of loading wish list with known cartId this property will be empty.
   */
  customerId?: string;
  /**
   * Cart id used as a store entity key. This could point either to some
   * temporary cart used to track loading/error state or to normal wish list entity.
   */
  cartId: string;
  error: any;
}

export class LoadWishListFail extends EntityFailAction {
  readonly type = LOAD_WISH_LIST_FAIL;
  constructor(public payload: LoadWishListFailPayload) {
    super(MULTI_CART_DATA, payload.cartId, payload.error);
  }
}

export type WishListActions =
  | CreateWishList
  | CreateWishListSuccess
  | CreateWishListFail
  | LoadWishList
  | LoadWishListSuccess
  | LoadWishListFail;
