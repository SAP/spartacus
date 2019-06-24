import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import {
  CartsState,
  CartState,
  CART_FEATURE,
  StateWithCart,
} from '../cart-state';

export const getCartContentSelector = (state: CartState) => state.content;
export const getRefreshSelector = (state: CartState) => state.refresh;
export const getEntriesSelector = (state: CartState) => state.entries;
export const getCartMergeCompleteSelector = (state: CartState) =>
  state.cartMergeComplete;

export const getCartsState: MemoizedSelector<
  StateWithCart,
  CartsState
> = createFeatureSelector<CartsState>(CART_FEATURE);

export const getActiveCartState: MemoizedSelector<
  StateWithCart,
  LoaderState<CartState>
> = createSelector(
  getCartsState,
  (cartsState: CartsState) => cartsState.active
);

export const getCartState: MemoizedSelector<
  StateWithCart,
  CartState
> = createSelector(
  getActiveCartState,
  state => loaderValueSelector(state)
);

export const getCartContent: MemoizedSelector<
  StateWithCart,
  Cart
> = createSelector(
  getCartState,
  getCartContentSelector
);

export const getCartRefresh: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(
  getCartState,
  getRefreshSelector
);

export const getCartLoaded: MemoizedSelector<any, boolean> = createSelector(
  getActiveCartState,
  state =>
    loaderSuccessSelector(state) &&
    !loaderLoadingSelector(state) &&
    !loaderValueSelector(state).refresh
);

export const getCartLoading: MemoizedSelector<any, boolean> = createSelector(
  getActiveCartState,
  state => loaderLoadingSelector(state)
);

export const getCartMergeComplete: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(
  getCartState,
  getCartMergeCompleteSelector
);

export const getCartEntriesMap: MemoizedSelector<
  any,
  { [code: string]: OrderEntry }
> = createSelector(
  getCartState,
  getEntriesSelector
);

export const getCartEntrySelectorFactory = (
  productCode
): MemoizedSelector<any, OrderEntry> => {
  return createSelector(
    getCartEntriesMap,
    entries => {
      if (entries) {
        return entries[productCode];
      }
    }
  );
};

export const getCartEntries: MemoizedSelector<
  any,
  OrderEntry[]
> = createSelector(
  getCartEntriesMap,
  entities => {
    return Object.keys(entities).map(code => entities[code]);
  }
);
