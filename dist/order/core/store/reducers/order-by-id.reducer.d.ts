import { Order } from '@spartacus/order/root';
import { OrderActions } from '..';
export declare const initialStateOfOrderById: Order | undefined;
export declare function reducer(state: Order | undefined, action: OrderActions.OrderByIdAction): Order | undefined;
