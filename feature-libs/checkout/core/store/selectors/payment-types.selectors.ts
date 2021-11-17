import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PaymentType } from '@spartacus/core';
import {
  CheckoutState,
  PaymentTypesState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/payment-types.reducer';
import { getCheckoutState } from './checkout.selectors';

export const getPaymentTypesState: MemoizedSelector<
  StateWithCheckout,
  PaymentTypesState
> = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.paymentTypes
);

export const getPaymentTypesEntites: MemoizedSelector<
  StateWithCheckout,
  { [code: string]: PaymentType }
> = createSelector(getPaymentTypesState, fromReducer.getPaymentTypesEntites);

export const getAllPaymentTypes: MemoizedSelector<
  StateWithCheckout,
  PaymentType[]
> = createSelector(getPaymentTypesEntites, (entites) => {
  return Object.keys(entites).map((code) => entites[code]);
});

export const getSelectedPaymentType: MemoizedSelector<
  StateWithCheckout,
  string | undefined
> = createSelector(getPaymentTypesState, fromReducer.getSelectedPaymentType);
