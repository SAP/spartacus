import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { entityValueSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityProcessesLoaderState } from '../../../state/utils/entity-processes-loader/entity-processes-loader-state';
import {
  entityHasPendingProcessesSelector,
  entityIsStableSelector,
  entityProcessesLoaderStateSelector,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.selectors';
import { ProcessesLoaderState } from '../../../state/utils/processes-loader/processes-loader-state';
import {
  MultiCartState,
  MULTI_CART_FEATURE,
  StateWithMultiCart,
} from '../multi-cart-state';

export const getMultiCartState: MemoizedSelector<
  StateWithMultiCart,
  MultiCartState
> = createFeatureSelector<MultiCartState>(MULTI_CART_FEATURE);

export const getMultiCartEntities: MemoizedSelector<
  StateWithMultiCart,
  EntityProcessesLoaderState<Cart>
> = createSelector(getMultiCartState, (state: MultiCartState) => state.carts);

export const getCartEntitySelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, ProcessesLoaderState<Cart>> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityProcessesLoaderState<Cart>) =>
      entityProcessesLoaderStateSelector(state, cartId)
  );
};

export const getCartSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, Cart> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityProcessesLoaderState<Cart>) =>
      entityValueSelector(state, cartId)
  );
};

export const getCartIsStableSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityProcessesLoaderState<Cart>) =>
      entityIsStableSelector(state, cartId)
  );
};

export const getCartHasPendingProcessesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityProcessesLoaderState<Cart>) =>
      entityHasPendingProcessesSelector(state, cartId)
  );
};

export const getCartEntriesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, OrderEntry[]> => {
  return createSelector(getCartSelectorFactory(cartId), (state: Cart) => {
    return state && state.entries ? state.entries : [];
  });
};

export const getCartEntrySelectorFactory = (
  cartId: string,
  productCode: string
): MemoizedSelector<StateWithMultiCart, OrderEntry> => {
  return createSelector(
    getCartEntriesSelectorFactory(cartId),
    (state: OrderEntry[]) => {
      return state
        ? state.find((entry) => entry.product.code === productCode)
        : undefined;
    }
  );
};

export const getActiveCartId: MemoizedSelector<StateWithMultiCart, string> =
  createSelector(getMultiCartState, (state: MultiCartState) => state.active);

export const getWishListId: MemoizedSelector<StateWithMultiCart, string> =
  createSelector(getMultiCartState, (state: MultiCartState) => state.wishList);

export const getCartsSelectorFactory: MemoizedSelector<
  StateWithMultiCart,
  Cart[]
> = createSelector(
  getMultiCartEntities,
  (state: EntityProcessesLoaderState<Cart>) =>
    Object.keys(state.entities).map((key) => entityValueSelector(state, key))
);
