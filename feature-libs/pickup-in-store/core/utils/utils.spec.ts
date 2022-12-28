import { PointOfServiceStock } from '@spartacus/core';
import { getProperty, storeHasStock } from './utils';

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

describe('Object Utils - getProperty', () => {
  it('should return null if arg is null', () => {
    const received = getProperty(null, 'key');
    expect(received).toBeNull();
  });
  it('should return null if key is not present in object', () => {
    const received = getProperty({}, 'key');
    expect(received).toBeNull();
  });
  it('should return key value if key is present in object', () => {
    const received = getProperty({ key: 'value' }, 'key');
    expect(received).toEqual('value');
  });
});
