import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AddressValidation } from '../../../model/address.model';
import {
  StateWithUser,
  UserAddressVerificationState,
  UserState,
} from '../user-state';
import * as fromReducer from './../reducers/user-address-verification.reducer';
import { getUserState } from './feature.selector';

export const getUserAddressVerificationResultsState: MemoizedSelector<
  StateWithUser,
  UserAddressVerificationState
> = createSelector(
  getUserState,
  (state: UserState) => state.addressVerification
);

export const getUserAddressVerificationResults: MemoizedSelector<
  StateWithUser,
  string | AddressValidation
> = createSelector(
  getUserAddressVerificationResultsState,
  fromReducer.getAddressVerificationResults
);
