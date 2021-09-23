import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ConsignmentTracking } from '../../../model/index';
import {
  ConsignmentTrackingState,
  StateWithUser,
  UserState,
} from '../user-state';
import { getUserState } from './feature.selector';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getConsignmentTrackingState: MemoizedSelector<
  StateWithUser,
  ConsignmentTrackingState
> = createSelector(
  getUserState,
  (state: UserState) => state.consignmentTracking
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getConsignmentTracking: MemoizedSelector<
  StateWithUser,
  ConsignmentTracking
> = createSelector(
  getConsignmentTrackingState,
  (state: ConsignmentTrackingState) => state.tracking
);
