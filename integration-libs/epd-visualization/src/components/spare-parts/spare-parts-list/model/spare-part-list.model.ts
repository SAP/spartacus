import { Product } from '@spartacus/core';

export interface SparePartsList {
  itemsPerSlide: number;
  activeSlideStartIndex: number;
}

export interface SparePartListItem {
  product: Product;
  highlighted: boolean;
}
