import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AddressValidation } from '../../../model/address.model';
import {
  AddressVerificationState,
  CheckoutState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/address-verification.reducer';
import { getCheckoutState } from './checkout.selectors';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getAddressVerificationResultsState: MemoizedSelector<
  StateWithCheckout,
  AddressVerificationState
> = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.addressVerification
);

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getAddressVerificationResults: MemoizedSelector<
  StateWithCheckout,
  string | AddressValidation
> = createSelector(
  getAddressVerificationResultsState,
  fromReducer.getAddressVerificationResults
);
