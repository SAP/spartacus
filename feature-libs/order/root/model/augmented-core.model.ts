import { OrderEntriesSource } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum OrderEntriesSource {
    ORDER_DETAILS = 'ORDER_DETAILS',
  }
}
(OrderEntriesSource as any)['ORDER_DETAILS'] = 'ORDER_DETAILS';
