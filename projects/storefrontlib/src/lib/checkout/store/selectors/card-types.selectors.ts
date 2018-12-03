import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/card-types.reducer';
import { CardType } from '@spartacus/core';

export const getCardTypesState = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.cardTypes
);

export const getCardTypesEntites: MemoizedSelector<
  any,
  { [code: string]: CardType }
> = createSelector(
  getCardTypesState,
  fromReducer.getCardTypesEntites
);

export const getAllCardTypes: MemoizedSelector<
  any,
  CardType[]
> = createSelector(
  getCardTypesEntites,
  entites => {
    return Object.keys(entites).map(code => entites[code]);
  }
);
