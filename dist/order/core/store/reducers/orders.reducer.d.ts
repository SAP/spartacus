import { OrderHistoryList } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';
export declare const initialState: OrderHistoryList;
export declare function reducer(state: OrderHistoryList | undefined, action: OrderActions.UserOrdersAction): OrderHistoryList;
