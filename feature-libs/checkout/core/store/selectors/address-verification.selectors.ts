import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AddressValidation } from '@spartacus/core';
import {
  AddressVerificationState,
  CheckoutState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/address-verification.reducer';
import { getCheckoutState } from './checkout.selectors';

export const getAddressVerificationResultsState: MemoizedSelector<
  StateWithCheckout,
  AddressVerificationState
> = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.addressVerification
);

export const getAddressVerificationResults: MemoizedSelector<
  StateWithCheckout,
  string | AddressValidation
> = createSelector(
  getAddressVerificationResultsState,
  fromReducer.getAddressVerificationResults
);
