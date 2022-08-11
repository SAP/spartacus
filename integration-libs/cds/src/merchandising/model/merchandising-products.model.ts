import { Product } from '@spartacus/core';
import { MerchandisingMetadata } from './merchandising-metadata.model';

export interface MerchandisingProduct extends Product {
  metadata?: MerchandisingMetadata;
}

export interface MerchandisingProducts {
  metadata?: MerchandisingMetadata;
  products?: MerchandisingProduct[];
}
