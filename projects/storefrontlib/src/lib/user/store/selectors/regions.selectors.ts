import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromReducer from '../reducers/regions.reducer';
import { Region } from '@spartacus/core';

export const getRegionsState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.regions
);

export const getRegionsEntities: MemoizedSelector<any, any> = createSelector(
  getRegionsState,
  fromReducer.getRegionsEntities
);

export const getAllRegions: MemoizedSelector<any, Region[]> = createSelector(
  getRegionsEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);
