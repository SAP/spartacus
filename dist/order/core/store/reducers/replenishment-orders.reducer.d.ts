import { ReplenishmentOrderList } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';
export declare const initialState: ReplenishmentOrderList;
export declare function reducer(state: ReplenishmentOrderList | undefined, action: OrderActions.UserReplenishmentOrdersAction | OrderActions.ReplenishmentOrderDetailsAction): ReplenishmentOrderList;
