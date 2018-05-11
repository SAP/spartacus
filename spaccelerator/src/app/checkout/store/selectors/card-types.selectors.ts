import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/card-types.reducer';

export const getCardTypesState = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.cardTypes
);

export const getCardTypesEntites: MemoizedSelector<any, any> = createSelector(
  getCardTypesState,
  fromReducer.getCardTypesEntites
);

export const getAllCardTypes: MemoizedSelector<any, any> = createSelector(
  getCardTypesEntites,
  entites => {
    return Object.keys(entites).map(code => entites[code]);
  }
);
