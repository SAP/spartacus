import { MemoizedSelector, createSelector } from '@ngrx/store';

import { CheckoutState, AddressVerificationState } from '../checkout-state';
import * as fromReducer from './../reducers/address-verification.reducer';
import * as fromFeature from './../reducers/index';
import { AddressValidation } from '../../../occ/occ-models/occ.models';

export const getAddressVerificationResultsState: MemoizedSelector<
  CheckoutState,
  AddressVerificationState
> = createSelector(
  fromFeature.getCheckoutState,
  (state: CheckoutState) => state.addressVerification
);

export const getAddressVerificationResults: MemoizedSelector<
  CheckoutState,
  string | AddressValidation
> = createSelector(
  getAddressVerificationResultsState,
  fromReducer.getAddressVerificationResults
);
