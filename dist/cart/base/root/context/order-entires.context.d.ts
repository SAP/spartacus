import { AddOrderEntriesContext } from './add-order-entries.context';
import { GetOrderEntriesContext } from './get-order-entries.context';
export declare const ORDER_ENTRIES_CONTEXT: unique symbol;
export type OrderEntriesContext = Partial<AddOrderEntriesContext & GetOrderEntriesContext>;
