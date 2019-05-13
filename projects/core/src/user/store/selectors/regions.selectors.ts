import { MemoizedSelector, createSelector } from '@ngrx/store';

import { UserState, RegionsState, StateWithUser } from '../user-state';
import { getUserState } from './feature.selector';
import { Region } from '../../../model/address.model';

export const getRegionsState: MemoizedSelector<
  StateWithUser,
  RegionsState
> = createSelector(
  getUserState,
  (state: UserState) => state.regions
);

export const getAllRegions: MemoizedSelector<
  StateWithUser,
  Region[]
> = createSelector(
  getRegionsState,
  (state: RegionsState) => state.entities
);
