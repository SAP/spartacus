import { GetOrderDetailsContext } from './get-order-details.context';

export const ORDER_DETAILS_CONTEXT = Symbol('ORDER_DETAILS_CONTEXT');

export type OrderDetailsContext = Partial<GetOrderDetailsContext>;
