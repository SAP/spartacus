import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/index';
import * as fromReducer from '../reducers/regions.reducer';
import { UserState, RegionsState } from '../user-state';
import { Region } from '../../../occ-models/index';

export const getRegionsState: MemoizedSelector<
  any,
  RegionsState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.regions
);

export const getAllRegions: MemoizedSelector<any, Region[]> = createSelector(
  getRegionsState,
  fromReducer.getRegionsEntities
);
