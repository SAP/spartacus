import { PointOfServiceStock } from '@spartacus/core';

export interface StockEntities {
  [productCode: string]: PointOfServiceStock;
}
