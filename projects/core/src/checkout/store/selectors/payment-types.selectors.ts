import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PaymentType } from '../../../model/cart.model';
import {
  PaymentTypesState,
  CheckoutState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/payment-types.reducer';
import { getCheckoutState } from './checkout.selectors';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getPaymentTypesState: MemoizedSelector<
  StateWithCheckout,
  PaymentTypesState
> = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.paymentTypes
);

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getPaymentTypesEntites: MemoizedSelector<
  StateWithCheckout,
  { [code: string]: PaymentType }
> = createSelector(getPaymentTypesState, fromReducer.getPaymentTypesEntites);

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getAllPaymentTypes: MemoizedSelector<
  StateWithCheckout,
  PaymentType[]
> = createSelector(getPaymentTypesEntites, (entites) => {
  return Object.keys(entites).map((code) => entites[code]);
});

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getSelectedPaymentType: MemoizedSelector<
  StateWithCheckout,
  string
> = createSelector(getPaymentTypesState, fromReducer.getSelectedPaymentType);
