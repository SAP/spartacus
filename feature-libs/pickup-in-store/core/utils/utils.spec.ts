import { PointOfServiceStock } from '@spartacus/core';
import { storeHasStock } from './utils';

describe('Pickup in Store utils', () => {
  it('storeHasStock returns true if the store has stock', () => {
    const store: PointOfServiceStock = {
      stockInfo: {
        stockLevelStatus: 'inStock',
      },
    };
    expect(storeHasStock(store)).toBe(true);
  });

  it('storeHasStock returns false if the store has no stock information', () => {
    const store: PointOfServiceStock = {};
    expect(storeHasStock(store)).toBe(false);
  });

  it('storeHasStock returns false if the store is out of stock', () => {
    const store: PointOfServiceStock = {
      stockInfo: {
        stockLevelStatus: 'outOfStock',
      },
    };
    expect(storeHasStock(store)).toBe(false);
  });

  it('storeHasStock returns false if the store has low stock', () => {
    const store: PointOfServiceStock = {
      stockInfo: {
        stockLevelStatus: 'lowStock',
      },
    };
    expect(storeHasStock(store)).toBe(false);
  });
});
