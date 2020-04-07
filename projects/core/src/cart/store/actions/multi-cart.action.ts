import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { EntitySuccessAction } from '../../../state/utils/entity-loader/entity-loader.action';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
  EntityProcessesLoaderResetAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { EntityRemoveAction } from '../../../state/utils/entity/entity.action';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const REMOVE_TEMP_CART = '[Multi Cart] Remove Temp Cart';

export const RESET_MULTI_CART_DETAILS = '[Multi Cart] Reset Cart Details';

export const SET_TEMP_CART = '[Multi Cart] Set Temp Cart';

export const REMOVE_CART = '[Multi Cart] Remove Cart';

export const CART_PROCESSES_INCREMENT = '[Multi Cart] Cart Processes Increment';
export const CART_PROCESSES_DECREMENT = '[Multi Cart] Cart Processes Decrement';

export const SET_ACTIVE_CART_ID = '[Multi Cart] Set Active Cart Id';

export const CLEAR_MULTI_CART_STATE = '[Multi Cart] Clear Cart State';

/**
 * To keep track of cart creation process we use cart with `temp-${uuid}` id.
 * After creating cart we switch to entity with `code` or `guid`.
 * We need `temp-${uuid}` cart entities for loading/error state.
 */
export class RemoveTempCart extends EntityRemoveAction {
  readonly type = REMOVE_TEMP_CART;
  constructor(public payload: { tempCartId: string }) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

export class SetTempCart extends EntitySuccessAction {
  readonly type = SET_TEMP_CART;
  constructor(public payload: { cart: Cart; tempCartId: string }) {
    super(MULTI_CART_DATA, payload.tempCartId, payload.cart);
  }
}

export class ResetMultiCartDetails extends EntityProcessesLoaderResetAction {
  readonly type = RESET_MULTI_CART_DETAILS;
  constructor() {
    super(MULTI_CART_DATA, undefined);
  }
}

export class RemoveCart extends EntityRemoveAction {
  readonly type = REMOVE_CART;
  constructor(public payload: string) {
    super(MULTI_CART_DATA, payload);
  }
}

export class CartProcessesIncrement extends EntityProcessesIncrementAction {
  readonly type = CART_PROCESSES_INCREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_DATA, payload);
  }
}

export class CartProcessesDecrement extends EntityProcessesDecrementAction {
  readonly type = CART_PROCESSES_DECREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_DATA, payload);
  }
}

export class SetActiveCartId implements Action {
  readonly type = SET_ACTIVE_CART_ID;
  constructor(public payload: string) {}
}

export class ClearMultiCartState extends EntityRemoveAction {
  readonly type = CLEAR_MULTI_CART_STATE;
  constructor() {
    super(MULTI_CART_DATA, null);
  }
}

export type MultiCartActions =
  | RemoveTempCart
  | SetTempCart
  | ResetMultiCartDetails
  | RemoveCart
  | CartProcessesIncrement
  | CartProcessesDecrement
  | SetActiveCartId
  | ClearMultiCartState;
