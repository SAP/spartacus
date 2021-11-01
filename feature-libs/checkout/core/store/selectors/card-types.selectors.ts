import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CardType } from '@spartacus/core';
import {
  CardTypesState,
  CheckoutState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/card-types.reducer';
import { getCheckoutState } from './checkout.selectors';

export const getCardTypesState: MemoizedSelector<
  StateWithCheckout,
  CardTypesState
> = createSelector(getCheckoutState, (state: CheckoutState) => state.cardTypes);

export const getCardTypesEntites: MemoizedSelector<
  StateWithCheckout,
  { [code: string]: CardType }
> = createSelector(getCardTypesState, fromReducer.getCardTypesEntites);

export const getAllCardTypes: MemoizedSelector<StateWithCheckout, CardType[]> =
  createSelector(getCardTypesEntites, (entites) => {
    return Object.keys(entites).map((code) => entites[code]);
  });
