import { Order, OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderActions } from '../actions';
export declare const initialState: OrderHistoryList;
export declare const detailInitialState: Order;
export declare function historyReducer(state: OrderHistoryList | undefined, action: UnitOrderActions.UnitOrdersAction): OrderHistoryList;
export declare function detailReducer(state: Order | undefined, action: UnitOrderActions.UnitOrdersAction): Order;
