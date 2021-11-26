import { AddOrderEntriesContext } from './add-order-entries.context';
import { GetOrderEntriesContext } from './get-order-entries.context';

export const ORDER_ENTRIES_CONTEXT = Symbol('ORDER_ENTRIES_CONTEXT');

export type OrderEntriesContext = Partial<
  AddOrderEntriesContext & GetOrderEntriesContext
>;
