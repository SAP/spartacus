import { MemoizedSelector, createSelector } from '@ngrx/store';

import { CheckoutState, CardTypesState } from '../checkout-state';
import * as fromReducer from './../reducers/card-types.reducer';
import * as fromFeature from './../reducers/index';
import { CardType } from '../../../occ/occ-models/index';

export const getCardTypesState: MemoizedSelector<
  CheckoutState,
  CardTypesState
> = createSelector(
  fromFeature.getCheckoutState,
  (state: CheckoutState) => state.cardTypes
);

export const getCardTypesEntites: MemoizedSelector<
  CheckoutState,
  { [code: string]: CardType }
> = createSelector(
  getCardTypesState,
  fromReducer.getCardTypesEntites
);

export const getAllCardTypes: MemoizedSelector<
  CheckoutState,
  CardType[]
> = createSelector(
  getCardTypesEntites,
  entites => {
    return Object.keys(entites).map(code => entites[code]);
  }
);
