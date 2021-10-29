import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  MultiCartSelectors,
  MultiCartState,
  StateWithMultiCart,
} from '@spartacus/cart/main/core';

export const getWishListId: MemoizedSelector<StateWithMultiCart, string> =
  createSelector(
    MultiCartSelectors.getMultiCartState,
    (state: MultiCartState) => state.wishList
  );
