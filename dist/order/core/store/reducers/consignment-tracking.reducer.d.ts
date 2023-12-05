import { OrderActions } from '../actions/index';
import { ConsignmentTrackingState } from '../order-state';
export declare const initialState: ConsignmentTrackingState;
export declare function reducer(state: ConsignmentTrackingState | undefined, action: OrderActions.ConsignmentTrackingAction): ConsignmentTrackingState;
