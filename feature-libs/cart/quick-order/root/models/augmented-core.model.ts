import { OrderEntriesSource } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum OrderEntriesSource {
    QUICK_ORDER = 'QUICK_ORDER',
  }
}
(OrderEntriesSource as any)['QUICK_ORDER'] = 'QUICK_ORDER';
