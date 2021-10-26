import { OrderEntriesSource } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum OrderEntriesSource {
    ORDER_CONFIRMATION = 'ORDER_CONFIRMATION',
  }
}
(OrderEntriesSource as any)['ORDER_CONFIRMATION'] = 'ORDER_CONFIRMATION';
