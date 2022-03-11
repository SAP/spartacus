import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { OrderState, ORDER_FEATURE, StateWithOrder } from '../order-state';

export const getOrderState: MemoizedSelector<StateWithOrder, OrderState> =
  createFeatureSelector<OrderState>(ORDER_FEATURE);
