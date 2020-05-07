import { Product } from '@spartacus/core';

export interface MerchandisingProduct extends Product {
  metadata?: Map<string, string>;
}

export interface MerchandisingProducts {
  metadata?: Map<string, string>;
  products?: MerchandisingProduct[];
}
