import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserAddressesState, UserState } from '../user-state';
import * as fromFeature from '../reducers/index';
import * as fromUserAddressesReducer from '../reducers/user-addresses.reducer';
import { Address } from '../../../occ/occ-models/occ.models';

export const getAddressesState: MemoizedSelector<
  UserState,
  UserAddressesState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.addresses
);

export const getAddresses: MemoizedSelector<
  UserState,
  Address[]
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getAddresses
);

export const getAddressesLoading: MemoizedSelector<
  UserState,
  boolean
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getLoading
);

export const getAddressActionProcessingStatus: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getActionProcessingStatus
);
