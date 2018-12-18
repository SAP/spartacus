import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers/index';
import * as fromReducer from './../reducers/address-verification.reducer';
import { CheckoutState, AddressVerificationState } from '../checkout-state';

export const getAddressVerificationResultsState: MemoizedSelector<
  any,
  AddressVerificationState
> = createSelector(
  fromFeature.getCheckoutState,
  (state: CheckoutState) => state.addressVerification
);

export const getAddressVerificationResults: MemoizedSelector<
  any,
  any
> = createSelector(
  getAddressVerificationResultsState,
  fromReducer.getAddressVerificationResults
);
