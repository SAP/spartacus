import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ConsignmentTracking } from '../../../model/index';
import {
  ConsignmentTrackingState,
  StateWithUser,
  UserState,
} from '../user-state';
import { getUserState } from './feature.selector';

export const getConsignmentTrackingState: MemoizedSelector<
  StateWithUser,
  ConsignmentTrackingState
> = createSelector(
  getUserState,
  (state: UserState) => state.consignmentTracking
);

export const getConsignmentTracking: MemoizedSelector<
  StateWithUser,
  ConsignmentTracking
> = createSelector(
  getConsignmentTrackingState,
  (state: ConsignmentTrackingState) => state.tracking
);
