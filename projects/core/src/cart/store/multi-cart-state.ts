import { Cart } from '../../model/cart.model';
import { EntityProcessesLoaderState } from '../../state/utils/entity-processes-loader/entity-processes-loader-state';

export const MULTI_CART_FEATURE = 'multi-cart';
export const MULTI_CART_DATA = '[Multi Cart] Multi Cart Data';

export interface StateWithMultiCart {
  [MULTI_CART_FEATURE]: MultiCartState;
}

export interface MultiCartState {
  carts: EntityProcessesLoaderState<Cart>;
  active: string;
  wishList: string;
}
