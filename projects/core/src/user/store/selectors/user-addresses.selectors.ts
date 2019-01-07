import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserAddressesState, UserState, StateWithUser } from '../user-state';
import * as fromUserAddressesReducer from '../reducers/user-addresses.reducer';
import { Address } from '../../../occ/occ-models/index';
import { getUserState } from './feature.selector';

export const getAddressesState: MemoizedSelector<
  StateWithUser,
  UserAddressesState
> = createSelector(
  getUserState,
  (state: UserState) => state.addresses
);

export const getAddresses: MemoizedSelector<
  StateWithUser,
  Address[]
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getAddresses
);

export const getAddressesLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getLoading
);

export const getAddressActionProcessingStatus: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getAddressesState,
  fromUserAddressesReducer.getActionProcessingStatus
);
