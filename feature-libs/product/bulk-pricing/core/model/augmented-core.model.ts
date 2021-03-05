import { ProductScope } from '@spartacus/core';

declare module '@spartacus/core' {
  enum ProductScope {
    BULK_PRICES = 'bulkPrices',
  }
}

(ProductScope as any)['BULK_PRICES'] = 'bulkPrices';
