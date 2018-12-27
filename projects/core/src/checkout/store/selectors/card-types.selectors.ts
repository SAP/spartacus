import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers/index';
import * as fromReducer from './../reducers/card-types.reducer';
import { CheckoutState, CardTypesState } from '../checkout-state';
import { CardType } from '../../../occ/occ-models/index';

export const getCardTypesState: MemoizedSelector<
  any,
  CardTypesState
> = createSelector(
  fromFeature.getCheckoutState,
  (state: CheckoutState) => state.cardTypes
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
