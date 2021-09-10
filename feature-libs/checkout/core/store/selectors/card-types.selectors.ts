import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CardType } from '@spartacus/core';
import {
  CardTypesState,
  CheckoutState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/card-types.reducer';
import { getCheckoutState } from './checkout.selectors';

// TODO: Remove this file in 5.0 after full switch to query for card types
/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export const getCardTypesState: MemoizedSelector<
  StateWithCheckout,
  CardTypesState
> = createSelector(getCheckoutState, (state: CheckoutState) => state.cardTypes);

/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export const getCardTypesEntites: MemoizedSelector<
  StateWithCheckout,
  { [code: string]: CardType }
> = createSelector(getCardTypesState, fromReducer.getCardTypesEntites);

/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export const getAllCardTypes: MemoizedSelector<
  StateWithCheckout,
  CardType[]
> = createSelector(getCardTypesEntites, (entites) => {
  return Object.keys(entites).map((code) => entites[code]);
});
