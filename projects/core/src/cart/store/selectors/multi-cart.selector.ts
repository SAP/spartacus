import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  StateWithMultiCart,
  MultiCartState,
  MULTI_CART_FEATURE,
} from '../multi-cart-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  entityStateSelector,
  entityValueSelector,
} from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state';
import { OrderEntry } from '../../../model/order.model';
import { Cart } from '../../../model/cart.model';

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
    (state: EntityLoaderState<Cart>) => entityValueSelector(state, cartId)
  );
};

export const getCartEntriesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, OrderEntry[]> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<Cart>) => {
      const entityValue = entityValueSelector(state, cartId);
      return entityValue && entityValue.entries ? entityValue.entries : [];
    }
  );
};

export const getCartEntrySelectorFactory = (
  cartId: string,
  productCode: string
): MemoizedSelector<StateWithMultiCart, OrderEntry> => {
  return createSelector(
    getMultiCartEntities,
    (state: EntityLoaderState<Cart>) => {
      const entityValue = entityValueSelector(state, cartId);
      return entityValue && entityValue.entries
        ? entityValue.entries.find(entry => entry.product.code === productCode)
        : null;
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
