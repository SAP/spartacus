import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  CartsState,
  CartState,
  CART_FEATURE,
  StateWithCart,
} from '../cart-state';
import { User } from '../../../model/misc.model';

const getCartContentSelector = (state: CartState) => state.content;
const getCartRefreshSelector = (state: CartState) => state.refresh;
const getCartEntriesSelector = (state: CartState) => state.entries;
const getCartMergeCompleteSelector = (state: CartState) =>
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
> = createSelector(getActiveCartState, state =>
  StateLoaderSelectors.loaderValueSelector(state)
);

export const getCartContent: MemoizedSelector<
  StateWithCart,
  Cart
> = createSelector(getCartState, getCartContentSelector);

export const getCartRefresh: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(getCartState, getCartRefreshSelector);

export const getCartLoaded: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(
  getActiveCartState,
  state =>
    (StateLoaderSelectors.loaderSuccessSelector(state) &&
      !StateLoaderSelectors.loaderLoadingSelector(state) &&
      !StateLoaderSelectors.loaderValueSelector(state).refresh) ||
    (StateLoaderSelectors.loaderErrorSelector(state) &&
      !StateLoaderSelectors.loaderLoadingSelector(state) &&
      !StateLoaderSelectors.loaderValueSelector(state).refresh)
);

export const getCartLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(getActiveCartState, state =>
  StateLoaderSelectors.loaderLoadingSelector(state)
);

export const getCartMergeComplete: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(getCartState, getCartMergeCompleteSelector);

export const getCartEntriesMap: MemoizedSelector<
  StateWithCart,
  { [code: string]: OrderEntry }
> = createSelector(getCartState, getCartEntriesSelector);

export const getCartEntrySelectorFactory = (
  productCode: string
): MemoizedSelector<StateWithCart, OrderEntry> => {
  return createSelector(getCartEntriesMap, entries => {
    if (entries) {
      return entries[productCode];
    }
  });
};

export const getCartEntries: MemoizedSelector<
  StateWithCart,
  OrderEntry[]
> = createSelector(getCartEntriesMap, entities => {
  return Object.keys(entities).map(code => entities[code]);
});

export const getCartUser: MemoizedSelector<
  StateWithCart,
  User
> = createSelector(getCartContent, content => content.user);
