import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CartsState, CartState, StateWithCart } from '../cart-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { getCartsState } from './cart.selector';
import { StateLoaderSelectors } from '../../../state/utils/index';
const getSaveForLaterRefreshSelector = (state: CartState) => state.refresh;
const getCartEntriesSelector = (state: CartState) => state.entries;
const getSaveForLaterContentSelector = (state: CartState) => state.content;

export const getSaveForLaterCartState: MemoizedSelector<
  StateWithCart,
  LoaderState<CartState>
> = createSelector(
  getCartsState,
  (cartsState: CartsState) => cartsState.saveForLater
);

export const getSaveForLaterState: MemoizedSelector<
  StateWithCart,
  CartState
> = createSelector(
  getSaveForLaterCartState,
  state => StateLoaderSelectors.loaderValueSelector(state)
);

export const getSaveForLaterContent: MemoizedSelector<
  StateWithCart,
  Cart
> = createSelector(
  getSaveForLaterState,
  getSaveForLaterContentSelector
);

export const getSaveForLaterRefresh: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(
  getSaveForLaterState,
  getSaveForLaterRefreshSelector
);

export const getSaveForLaterLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getSaveForLaterCartState,
  state =>
    (StateLoaderSelectors.loaderSuccessSelector(state) &&
      !StateLoaderSelectors.loaderLoadingSelector(state) &&
      !StateLoaderSelectors.loaderValueSelector(state).refresh) ||
    (StateLoaderSelectors.loaderErrorSelector(state) &&
      !StateLoaderSelectors.loaderLoadingSelector(state) &&
      !StateLoaderSelectors.loaderValueSelector(state).refresh)
);

export const getSaveForLaterLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getSaveForLaterCartState,
  state => StateLoaderSelectors.loaderLoadingSelector(state)
);

export const getSaveForLaterEntriesMap: MemoizedSelector<
  any,
  { [code: string]: OrderEntry }
> = createSelector(
  getSaveForLaterState,
  getCartEntriesSelector
);

export const getSaveForLaterEntrySelectorFactory = (
  productCode
): MemoizedSelector<any, OrderEntry> => {
  return createSelector(
    getSaveForLaterEntriesMap,
    entries => {
      if (entries) {
        return entries[productCode];
      }
    }
  );
};

export const getSaveForLaterEntries: MemoizedSelector<
  any,
  OrderEntry[]
> = createSelector(
  getSaveForLaterEntriesMap,
  entities => {
    return Object.keys(entities).map(code => entities[code]);
  }
);
