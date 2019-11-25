import { Cart } from '../../model/cart.model';
import { EntityCounterState } from '../../state/utils/entity-counter/entity-counter-state';

export const MULTI_CART_FEATURE = 'multi-cart';
export const MULTI_CART_DATA = '[Multi Cart] Multi Cart Data';

export interface StateWithMultiCart {
  [MULTI_CART_FEATURE]: MultiCartState;
}

export interface MultiCartState {
  carts: EntityCounterState<Cart>;
  active: string;
}
