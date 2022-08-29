import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithUnitOrder,
  UnitOrderState,
  UNIT_ORDER_FEATURE,
} from '../unit-order-state';

export const getOrderState: MemoizedSelector<
  StateWithUnitOrder,
  UnitOrderState
> = createFeatureSelector<UnitOrderState>(UNIT_ORDER_FEATURE);
