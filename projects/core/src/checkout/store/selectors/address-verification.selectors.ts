import { MemoizedSelector, createSelector } from '@ngrx/store';

import {
  CheckoutState,
  AddressVerificationState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducer from './../reducers/address-verification.reducer';
import { AddressValidation } from '../../../occ/occ-models/occ.models';
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
