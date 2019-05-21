import { MemoizedSelector, createSelector } from '@ngrx/store';

import {
  CheckoutState,
  CardTypesState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/card-types.reducer';
import { getCheckoutState } from './checkout.selectors';
import { CardType } from '../../../model/cart.model';

export const getCardTypesState: MemoizedSelector<
  StateWithCheckout,
  CardTypesState
> = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.cardTypes
);

export const getCardTypesEntites: MemoizedSelector<
  StateWithCheckout,
  { [code: string]: CardType }
> = createSelector(
  getCardTypesState,
  fromReducer.getCardTypesEntites
);

export const getAllCardTypes: MemoizedSelector<
  StateWithCheckout,
  CardType[]
> = createSelector(
  getCardTypesEntites,
  entites => {
    return Object.keys(entites).map(code => entites[code]);
  }
);
