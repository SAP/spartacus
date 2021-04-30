import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CardType } from '../../../model/cart.model';
import {
  CardTypesState,
  CheckoutState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/card-types.reducer';
import { getCheckoutState } from './checkout.selectors';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getCardTypesState: MemoizedSelector<
  StateWithCheckout,
  CardTypesState
> = createSelector(getCheckoutState, (state: CheckoutState) => state.cardTypes);

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getCardTypesEntites: MemoizedSelector<
  StateWithCheckout,
  { [code: string]: CardType }
> = createSelector(getCardTypesState, fromReducer.getCardTypesEntites);

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getAllCardTypes: MemoizedSelector<
  StateWithCheckout,
  CardType[]
> = createSelector(getCardTypesEntites, (entites) => {
  return Object.keys(entites).map((code) => entites[code]);
});
