import { getDigitalPaymentsState } from './digital-payments-feature.selector';
import { StateUtils } from '@spartacus/core';
import {
  DigitalPaymentsState,
  StateWithDigitalPayments,
} from '../digital-payments-state';
import { DpPaymentRequest } from '../../models';
import { createSelector, MemoizedSelector } from '@ngrx/store';

export const getDpCheckoutPaymentRequestState: MemoizedSelector<
  StateWithDigitalPayments,
  StateUtils.LoaderState<DpPaymentRequest>
> = createSelector(
  getDigitalPaymentsState,
  (state: DigitalPaymentsState) => state.paymentRequest
);

export const getDpCheckoutPaymentRequest: MemoizedSelector<
  StateWithDigitalPayments,
  DpPaymentRequest
> = createSelector(
  getDpCheckoutPaymentRequestState,
  (state: StateUtils.LoaderState<DpPaymentRequest>) =>
    StateUtils.loaderValueSelector(state)
);
