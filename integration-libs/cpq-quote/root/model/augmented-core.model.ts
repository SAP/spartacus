
/**
 * Identifiers of cpq-quote.
 */
import '@spartacus/cart/base/root';
import { cpqDiscounts } from './cpqDiscounts.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    cpqDiscounts?: cpqDiscounts[];
  }
}
