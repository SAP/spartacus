import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUserAddressesReducer from '../reducers/user-addresses.reducer';
import { UserAddressesState } from '../reducers/user-addresses.reducer';

export const getAddressesState: MemoizedSelector<
  any,
  UserAddressesState
> = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.addresses
);

export const getAddresses: MemoizedSelector<any, any> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getAddresses
);

export const getAddressesLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getLoading
);
