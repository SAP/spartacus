import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/address-verification.reducer';

export const getAddressVerificationResultsState = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.addressVerificationResults
);

export const getAddressVerificationResultsEntities: MemoizedSelector<
  any,
  any
> = createSelector(
  getAddressVerificationResultsState,
  fromReducer.getAddressVerificationResultsEntities
);
