import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { EntityLoaderState } from '../../../state';
import {
  entityLoadingSelector,
  entityStateSelector,
  entityValueSelector,
} from '../../../state/utils/entity-loader/entity-loader.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CartWithCounter } from '../cart-state';
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
  EntityLoaderState<CartWithCounter>
> = createSelector(
  getMultiCartState,
  (state: MultiCartState) => state.carts
);

export const getCartEntitySelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, LoaderState<CartWithCounter>> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<CartWithCounter>) =>
      entityStateSelector(state, cartId)
  );
};

export const getCartSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, Cart> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<CartWithCounter>) => {
      const value = entityValueSelector(state, cartId);
      return value && value.cart ? value.cart : undefined;
    }
  );
};

export const getCartCounterSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, number> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<CartWithCounter>) => {
      const value = entityValueSelector(state, cartId);
      return value && value.counter ? value.counter : 0;
    }
  );
};

export const getCartLoadingSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<CartWithCounter>) => {
      const value = entityValueSelector(state, cartId);
      const loading = entityLoadingSelector(state, cartId);
      const counter = value && value.counter ? value.counter : 0;
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
