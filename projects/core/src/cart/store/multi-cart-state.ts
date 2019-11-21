import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { CartWithCounter } from './cart-state';

export const MULTI_CART_FEATURE = 'multi-cart';
export const MULTI_CART_DATA = '[Multi Cart] Multi Cart Data';

export interface StateWithMultiCart {
  [MULTI_CART_FEATURE]: MultiCartState;
}

export interface MultiCartState {
  carts: EntityLoaderState<CartWithCounter>;
  active: string;
}
