import { Order } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';
export declare const initialState: Order;
export declare function reducer(state: Order | undefined, action: OrderActions.OrderDetailsAction): Order;
