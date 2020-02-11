import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  AUTH_OCC_USER_ID_FEATURE,
  OccUserIdState,
  StateWithOccUserId,
} from '../occ-user-id-state';

export const getOccUserIdState: MemoizedSelector<
  StateWithOccUserId,
  OccUserIdState
> = createFeatureSelector<OccUserIdState>(AUTH_OCC_USER_ID_FEATURE);

export const getOccUserId: MemoizedSelector<
  StateWithOccUserId,
  string
> = createSelector(
  getOccUserIdState,
  (state: OccUserIdState) => state.occUserId
);
