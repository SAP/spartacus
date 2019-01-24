import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserAddressesState, UserState, StateWithUser } from '../user-state';
import { Address } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getAddressesLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<UserAddressesState>
> = createSelector(
  getUserState,
  (state: UserState) => state.addresses
);

export const getAddressesState: MemoizedSelector<
  StateWithUser,
  UserAddressesState
> = createSelector(
  getAddressesLoaderState,
  (state: LoaderState<UserAddressesState>) => loaderValueSelector(state)
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
  getAddressesLoaderState,
  (state: LoaderState<UserAddressesState>) => loaderLoadingSelector(state)
);

export const getAddressActionProcessingStatus: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getAddressesState,
  (state: UserAddressesState) => state.isActionProcessing
);
