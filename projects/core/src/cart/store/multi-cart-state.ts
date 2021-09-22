import { Cart } from '../../model/cart.model';
import { EntityProcessesLoaderState } from '../../state/utils/entity-processes-loader/entity-processes-loader-state';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const MULTI_CART_FEATURE = 'cart';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const MULTI_CART_DATA = '[Multi Cart] Multi Cart Data';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export interface StateWithMultiCart {
  [MULTI_CART_FEATURE]: MultiCartState;
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export interface MultiCartState {
  carts: EntityProcessesLoaderState<Cart>;
  active: string;
  wishList: string;
}
