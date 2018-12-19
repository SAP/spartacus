import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/index';
import * as fromUserAddressesReducer from '../reducers/user-addresses.reducer';
import { UserAddressesState, UserState } from '../user-state';
import { Address } from '../../../occ/occ-models';

export const getAddressesState: MemoizedSelector<
  any,
  UserAddressesState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.addresses
);

export const getAddresses: MemoizedSelector<any, Address[]> = createSelector(
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

export const getAddressActionProcessingStatus: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getActionProcessingStatus
);
