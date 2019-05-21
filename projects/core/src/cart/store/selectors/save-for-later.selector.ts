import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CartsState, CartState, StateWithCart } from '../cart-state';
import {
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';

import {
  getCartsState,
  getRefreshSelector,
  getEntriesSelector,
} from './cart.selector';

export const getSavaForLaterContentSelector = (state: CartState) =>
  state.content;

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
  state => loaderValueSelector(state)
);

export const getSavaForLaterContent: MemoizedSelector<
  StateWithCart,
  Cart
> = createSelector(
  getSaveForLaterState,
  getSavaForLaterContentSelector
);

export const getSaveForLaterRefresh: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(
  getSaveForLaterState,
  getRefreshSelector
);

export const getSaveForLaterLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getSaveForLaterCartState,
  state =>
    loaderSuccessSelector(state) &&
    !loaderLoadingSelector(state) &&
    !loaderValueSelector(state).refresh
);

export const getSaveForLaterEntriesMap: MemoizedSelector<
  any,
  { [code: string]: OrderEntry }
> = createSelector(
  getSaveForLaterState,
  getEntriesSelector
);
