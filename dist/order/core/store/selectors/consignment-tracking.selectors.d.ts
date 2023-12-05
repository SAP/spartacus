import { MemoizedSelector } from '@ngrx/store';
import { ConsignmentTracking } from '@spartacus/order/root';
import { ConsignmentTrackingState, StateWithOrder } from '../order-state';
export declare const getConsignmentTrackingState: MemoizedSelector<StateWithOrder, ConsignmentTrackingState>;
export declare const getConsignmentTracking: MemoizedSelector<StateWithOrder, ConsignmentTracking>;
