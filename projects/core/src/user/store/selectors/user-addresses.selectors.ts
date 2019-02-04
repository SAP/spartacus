import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserAddressesState, UserState, StateWithUser } from '../user-state';
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
  (state: UserAddressesState) => state.list
);

export const getAddressesLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getAddressesState,
  (state: UserAddressesState) => state.isLoading
);

export const getAddressActionProcessingStatus: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getAddressesState,
  (state: UserAddressesState) => state.isActionProcessing
);
