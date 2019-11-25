import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { EntityLoaderState } from '../../../state';
import {
  entityCounterSelector,
  entityLoadingSelector,
  entityStateSelector,
  entityValueSelector,
} from '../../../state/utils/entity-loader/entity-loader.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
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
  EntityLoaderState<Cart>
> = createSelector(
  getMultiCartState,
  (state: MultiCartState) => state.carts
);

export const getCartEntitySelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, LoaderState<Cart>> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<Cart>) => entityStateSelector(state, cartId)
  );
};

export const getCartSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, Cart> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<Cart>) => {
      return entityValueSelector(state, cartId);
    }
  );
};

export const getCartCounterSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, number> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<Cart>) => {
      const counter = entityCounterSelector(state, cartId);
      return counter ? counter : 0;
    }
  );
};

export const getCartLoadingSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<Cart>) => {
      const counter = entityCounterSelector(state, cartId);
      const loading = entityLoadingSelector(state, cartId);
      return loading || counter > 0;
    }
  );
};

export const getCartEntriesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, OrderEntry[]> => {
  return createSelector(
    getCartSelectorFactory(cartId),
    (state: Cart) => {
      return state && state.entries ? state.entries : [];
    }
  );
};

export const getCartEntrySelectorFactory = (
  cartId: string,
  productCode: string
): MemoizedSelector<StateWithMultiCart, OrderEntry> => {
  return createSelector(
    getCartEntriesSelectorFactory(cartId),
    (state: OrderEntry[]) => {
      return state.find(entry => entry.product.code === productCode);
    }
  );
};

export const getActiveCartId: MemoizedSelector<
  StateWithMultiCart,
  string
> = createSelector(
  getMultiCartState,
  (state: MultiCartState) => state.active
);
