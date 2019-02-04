import { MemoizedSelector, createSelector } from '@ngrx/store';

import { UserState, RegionsState, StateWithUser } from '../user-state';
import { Region } from '../../../occ/occ-models/index';
import { getUserState } from './feature.selector';

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
