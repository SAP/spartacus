import { Product } from '@spartacus/core';

export interface ProductItem extends Product {
  quantity?: number;
}
