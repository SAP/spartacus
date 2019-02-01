import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { Address } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getAddressesLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<Address[]>
> = createSelector(
  getUserState,
  (state: UserState) => state.addresses
);

export const getAddresses: MemoizedSelector<
  StateWithUser,
  Address[]
> = createSelector(
  getAddressesLoaderState,
  (state: LoaderState<Address[]>) => loaderValueSelector(state)
);

export const getAddressesLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getAddressesLoaderState,
  (state: LoaderState<Address[]>) => loaderLoadingSelector(state)
);
