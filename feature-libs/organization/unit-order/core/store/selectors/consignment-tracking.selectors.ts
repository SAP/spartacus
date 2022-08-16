import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ConsignmentTrackingState } from '@spartacus/order/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { StateWithUnitOrder, UnitOrderState } from '../unit-order-state';

import { getOrderState } from './feature.selector';

export const getConsignmentTrackingState: MemoizedSelector<
  StateWithUnitOrder,
  ConsignmentTrackingState
> = createSelector(
  getOrderState,
  (state: UnitOrderState) => state.consignmentTracking
);

export const getConsignmentTracking: MemoizedSelector<
  StateWithUnitOrder,
  ConsignmentTracking
> = createSelector(
  getConsignmentTrackingState,
  (state: ConsignmentTrackingState) => state.tracking
);
