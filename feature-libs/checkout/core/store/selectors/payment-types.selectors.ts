import { createSelector, MemoizedSelector } from '@ngrx/store';
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

export const getSelectedPaymentType: MemoizedSelector<
  StateWithCheckout,
  string | undefined
> = createSelector(getPaymentTypesState, fromReducer.getSelectedPaymentType);
