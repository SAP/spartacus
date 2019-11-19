import { Product } from '@spartacus/core';

export interface MerchandisingProducts {
  metadata?: Map<string, string>;
  products?: Product[];
}
