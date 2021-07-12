import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { EntitySuccessAction } from '../../../state/utils/entity-loader/entity-loader.action';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { EntityRemoveAllAction } from '../../../state/utils/entity/entity.action';
import { MULTI_CART_DATA } from '../multi-cart-state';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const SET_TEMP_CART = '[Cart] Set Temp Cart';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_PROCESSES_INCREMENT = '[Cart] Cart Processes Increment';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_PROCESSES_DECREMENT = '[Cart] Cart Processes Decrement';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const SET_ACTIVE_CART_ID = '[Cart] Set Active Cart Id';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CLEAR_CART_STATE = '[Cart] Clear Cart State';

/**
 * To keep track of cart creation process we use cart with `temp-${uuid}` id.
 * After creating cart we switch to entity with `code` or `guid`.
 * We need `temp-${uuid}` cart entities for loading/error state.
 *
 * @deprecated since 4.1 - use cart lib instead
 */
export class SetTempCart extends EntitySuccessAction {
  readonly type = SET_TEMP_CART;
  constructor(public payload: { cart: Cart; tempCartId: string }) {
    super(MULTI_CART_DATA, payload.tempCartId, payload.cart);
  }
}

// TODO(#7241): Remove when there won't be any usage
/**
 * Increases process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesIncrementAction instead of dispatching this action.
 * @deprecated since 2.0
 */
export class CartProcessesIncrement extends EntityProcessesIncrementAction {
  readonly type = CART_PROCESSES_INCREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_DATA, payload);
  }
}

// TODO(#7241): Remove when there won't be any usage
/**
 * Decrement process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesDecrementAction instead of dispatching this action.
 * @deprecated since 2.0
 */
export class CartProcessesDecrement extends EntityProcessesDecrementAction {
  readonly type = CART_PROCESSES_DECREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_DATA, payload);
  }
}

/**
 * Only sets active cart property with id of active cart. Then services take care of loading that cart.
 *
 * @deprecated since 4.1 - use cart lib instead
 */
export class SetActiveCartId implements Action {
  readonly type = SET_ACTIVE_CART_ID;
  constructor(public payload: string) {}
}

/**
 * Clear whole cart store state: all entities + reset rest of the cart state.
 *
 * @deprecated since 4.1 - use cart lib instead
 */
export class ClearCartState extends EntityRemoveAllAction {
  readonly type = CLEAR_CART_STATE;
  constructor() {
    super(MULTI_CART_DATA);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export type MultiCartActions =
  | SetTempCart
  | CartProcessesIncrement
  | CartProcessesDecrement
  | SetActiveCartId
  | ClearCartState;
