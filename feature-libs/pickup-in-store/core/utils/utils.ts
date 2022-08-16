import { PointOfServiceStock } from '@spartacus/core';

export function storeHasStock({ stockInfo }: PointOfServiceStock): boolean {
  return (
    !!stockInfo &&
    stockInfo.stockLevelStatus !== 'outOfStock' &&
    stockInfo.stockLevelStatus !== 'lowStock'
  );
}
