import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart, EntitiesModel, StateUtils } from '@spartacus/core';
import {
  SavedCartManagement,
  SavedCartState,
  SAVED_CART_FEATURE,
} from '../saved-cart-state';

export const getSavedCartState: MemoizedSelector<
  SavedCartState,
  SavedCartManagement
> = createFeatureSelector<SavedCartManagement>(SAVED_CART_FEATURE);

export const getSavedCartsState: MemoizedSelector<
  SavedCartState,
  StateUtils.EntityLoaderState<Cart>
> = createSelector(
  getSavedCartState,
  (state: SavedCartManagement) => state && state.entities
);

export const getSavedCart = (
  cartId: string
): MemoizedSelector<SavedCartState, StateUtils.LoaderState<Cart>> =>
  createSelector(
    getSavedCartsState,
    (state: StateUtils.EntityLoaderState<Cart>) =>
      StateUtils.entityLoaderStateSelector(state, cartId)
  );

export const getSavedCartList = (): MemoizedSelector<
  SavedCartState,
  StateUtils.LoaderState<EntitiesModel<Cart>>
> =>
  createSelector(getSavedCartState, (state: SavedCartManagement) => {
    return StateUtils.denormalizeSearch<Cart>(state);
  });
