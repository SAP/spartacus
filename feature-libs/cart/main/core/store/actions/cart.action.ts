import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { EntityRemoveAction } from '../../../state/utils/entity/entity.action';
import { ProcessesLoaderResetAction } from '../../../state/utils/processes-loader/processes-loader.action';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const CREATE_CART = '[Cart] Create Cart';
export const CREATE_CART_FAIL = '[Cart] Create Cart Fail';
export const CREATE_CART_SUCCESS = '[Cart] Create Cart Success';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_FAIL = '[Cart] Load Cart Fail';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';

export const LOAD_CARTS_SUCCESS = '[Cart] Load Carts Success';

export const ADD_EMAIL_TO_CART = '[Cart] Add Email to Cart';
export const ADD_EMAIL_TO_CART_FAIL = '[Cart] Add Email to Cart Fail';
export const ADD_EMAIL_TO_CART_SUCCESS = '[Cart] Add Email to Cart Success';

export const MERGE_CART = '[Cart] Merge Cart';
export const MERGE_CART_SUCCESS = '[Cart] Merge Cart Success';

export const RESET_CART_DETAILS = '[Cart] Reset Cart Details';

export const REMOVE_CART = '[Cart] Remove Cart';

export const DELETE_CART = '[Cart] Delete Cart';
export const DELETE_CART_SUCCESS = '[Cart] Delete Cart Success';
export const DELETE_CART_FAIL = '[Cart] Delete Cart Fail';

interface CreateCartPayload {
  userId: string;
  /** Used as a unique key in ngrx carts store (we don't know cartId at that time) */
  tempCartId: string;
  extraData?: {
    active?: boolean;
  };
  /** Anonymous cart which should be merged to new cart */
  oldCartId?: string;
  /** Cart to which should we merge (not passing this will create new cart) */
  toMergeCartGuid?: string;
}

export class CreateCart extends EntityLoadAction {
  readonly type = CREATE_CART;
  constructor(public payload: CreateCartPayload) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

interface CreateCartFailPayload extends CreateCartPayload {
  error: any;
}

export class CreateCartFail extends EntityFailAction {
  readonly type = CREATE_CART_FAIL;
  constructor(public payload: CreateCartFailPayload) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

interface CreateCartSuccessPayload extends CreateCartPayload {
  cart: Cart;
  cartId: string;
}

export class CreateCartSuccess extends EntitySuccessAction {
  readonly type = CREATE_CART_SUCCESS;
  constructor(public payload: CreateCartSuccessPayload) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class AddEmailToCart extends EntityProcessesIncrementAction {
  readonly type = ADD_EMAIL_TO_CART;
  constructor(
    public payload: { userId: string; cartId: string; email: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class AddEmailToCartFail extends EntityProcessesDecrementAction {
  readonly type = ADD_EMAIL_TO_CART_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      error: any;
      email: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class AddEmailToCartSuccess extends EntityProcessesDecrementAction {
  readonly type = ADD_EMAIL_TO_CART_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; email: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

interface LoadCartPayload {
  userId: string;
  cartId: string;
  extraData?: {
    active?: boolean;
  };
}

export class LoadCart extends EntityLoadAction {
  readonly type = LOAD_CART;
  constructor(public payload: LoadCartPayload) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

interface LoadCartFailPayload extends LoadCartPayload {
  error: any;
}

export class LoadCartFail extends EntityFailAction {
  readonly type = LOAD_CART_FAIL;
  constructor(public payload: LoadCartFailPayload) {
    super(MULTI_CART_DATA, payload.cartId, payload.error);
  }
}

interface LoadCartSuccessPayload extends LoadCartPayload {
  cart: Cart;
}

export class LoadCartSuccess extends EntitySuccessAction {
  readonly type = LOAD_CART_SUCCESS;
  constructor(public payload: LoadCartSuccessPayload) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class LoadCartsSuccess extends EntitySuccessAction {
  readonly type = LOAD_CARTS_SUCCESS;
  constructor(public payload: Cart[]) {
    super(
      MULTI_CART_DATA,
      payload.map((cart) => cart?.code)
    );
  }
}

interface MergeCartPayload {
  cartId: string;
  userId: string;
  extraData?: { active?: boolean };
  /**
   * MergeCart actions triggers CreateCart which requires this parameter, so that's why it is required.
   */
  tempCartId: string;
}

export class MergeCart implements Action {
  readonly type = MERGE_CART;
  constructor(public payload: MergeCartPayload) {}
}

interface MergeCartSuccessPayload extends MergeCartPayload {
  /**
   * Previous cart id which was merged with new/user cart.
   * Needed to know which obsolete entity should be removed.
   */
  oldCartId: string;
}

export class MergeCartSuccess extends EntityRemoveAction {
  readonly type = MERGE_CART_SUCCESS;
  constructor(public payload: MergeCartSuccessPayload) {
    super(MULTI_CART_DATA, payload.oldCartId);
  }
}

/**
 * On site context change we want to keep current list of entities, but we want to clear the value and flags.
 * With ProcessesLoaderResetAction we run it on every entity of this type.
 */
export class ResetCartDetails extends ProcessesLoaderResetAction {
  readonly type = RESET_CART_DETAILS;
  constructor() {
    super(MULTI_CART_DATA);
  }
}

/**
 * Used for cleaning cart in local state, when we get information that it no longer exists in the backend.
 * For removing particular cart in both places use DeleteCart actions.
 */
export class RemoveCart extends EntityRemoveAction {
  readonly type = REMOVE_CART;
  constructor(public payload: { cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class DeleteCart implements Action {
  readonly type = DELETE_CART;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class DeleteCartSuccess extends EntityRemoveAction {
  readonly type = DELETE_CART_SUCCESS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class DeleteCartFail implements Action {
  readonly type = DELETE_CART_FAIL;
  constructor(public payload: { userId: string; cartId: string; error: any }) {}
}

export type CartAction =
  | CreateCart
  | CreateCartFail
  | CreateCartSuccess
  | LoadCart
  | LoadCartFail
  | LoadCartSuccess
  | LoadCartsSuccess
  | MergeCart
  | MergeCartSuccess
  | ResetCartDetails
  | AddEmailToCart
  | AddEmailToCartFail
  | AddEmailToCartSuccess
  | DeleteCart
  | DeleteCartSuccess
  | DeleteCartFail
  | RemoveCart;
