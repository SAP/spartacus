import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromReducer from '../reducers/regions.reducer';
import { Region } from '@spartacus/core';

export const getRegionsState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.regions
);

export const getAllRegions: MemoizedSelector<any, Region[]> = createSelector(
  getRegionsState,
  fromReducer.getRegionsEntities
);
