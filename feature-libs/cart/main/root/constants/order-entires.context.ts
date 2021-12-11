import { GetOrderDetailsContext } from '@spartacus/checkout/base/root';

export const ORDER_ENTRIES_CONTEXT = Symbol('ORDER_ENTRIES_CONTEXT');
export const ORDER_DETAILS_CONTEXT = Symbol('ORDER_DETAILS_CONTEXT');

export type OrderDetailsContext = Partial<GetOrderDetailsContext>;
