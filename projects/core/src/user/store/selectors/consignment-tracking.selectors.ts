import { createSelector, MemoizedSelector } from '@ngrx/store';

import {
  ConsignmentTrackingState,
  UserState,
  StateWithUser,
} from '../user-state';
import { ConsignmentTracking } from '../../index';
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
