import { OrderEntriesSource } from '@spartacus/storefront';
declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    SAVED_CART = 'SAVED_CART',
  }

  enum OrderEntriesSource {
    SAVED_CART = 'SAVED_CART',
  }

  enum OrderEntriesSource {
    NEW_SAVED_CART = 'NEW_SAVED_CART',
  }
}

(OrderEntriesSource as any)['SAVED_CART'] = 'SAVED_CART';
(OrderEntriesSource as any)['NEW_SAVED_CART'] = 'NEW_SAVED_CART';
