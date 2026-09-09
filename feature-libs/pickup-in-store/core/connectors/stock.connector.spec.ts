import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { StockAdapter } from './stock.adapter';
import { StockConnector } from './stock.connector';

describe('StockConnector', () => {
  let service: StockConnector;
  let adapter: StockAdapter;

  const MockStockAdapter = {
    loadStockLevels: vi.fn(),
    loadStockLevelAtStore: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StockAdapter, useValue: MockStockAdapter }],
    });

    service = TestBed.inject(StockConnector);
    adapter = TestBed.inject(StockAdapter);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('loadStockLevels calls loadStockLevels', () => {
    service.loadStockLevels('P0001', { location: '' });
    expect(adapter.loadStockLevels).toHaveBeenCalledWith('P0001', {
      location: '',
    });
  });

  it('loadStockLevelAtStore calls loadStockLevelAtStore', () => {
    service.loadStockLevelAtStore('productCode', 'storeName');
    expect(adapter.loadStockLevelAtStore).toHaveBeenCalledWith(
      'productCode',
      'storeName'
    );
  });
});
