import { MemoizedSelector, createSelector } from '@ngrx/store';
import { CartContentState } from '../reducers/cart.reducer';

import * as fromFeature from './../reducers';
import * as fromCart from './../reducers/cart.reducer';
import { Cart } from '../../models/cart-types.model';

export const getCartState: MemoizedSelector<
  any,
  CartContentState
> = createSelector(
  fromFeature.getCartStateFeatureSelector,
  (cartState: fromFeature.CartState) => cartState.state
);

export const getCartContentState: MemoizedSelector<any, Cart> = createSelector(
  getCartState,
  fromCart.getCartContent
);
