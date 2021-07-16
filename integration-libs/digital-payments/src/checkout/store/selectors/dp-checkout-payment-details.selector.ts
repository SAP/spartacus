import { getDigitalPaymentsState } from './digital-payments-feature.selector';
import { StateUtils, PaymentDetails } from '@spartacus/core';
import {
  DigitalPaymentsState,
  StateWithDigitalPayments,
} from '../digital-payments-state';
import { createSelector, MemoizedSelector } from '@ngrx/store';

export const getDpCheckoutPaymentDetailsState: MemoizedSelector<
  StateWithDigitalPayments,
  StateUtils.LoaderState<PaymentDetails>
> = createSelector(
  getDigitalPaymentsState,
  (state: DigitalPaymentsState) => state.paymentDetails
);

export const getDpCheckoutPaymentDetails: MemoizedSelector<
  StateWithDigitalPayments,
  PaymentDetails
> = createSelector(
  getDpCheckoutPaymentDetailsState,
  (state: StateUtils.LoaderState<PaymentDetails>) =>
    StateUtils.loaderValueSelector(state)
);
