import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromReducer from '../reducers/regions.reducer';
import { UserState } from '../user-state';

export const getRegionsState = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.regions
);

export const getRegionsEntities: MemoizedSelector<any, any> = createSelector(
  getRegionsState,
  fromReducer.getRegionsEntities
);

export const getAllRegions: MemoizedSelector<any, any> = createSelector(
  getRegionsEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);
