import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { FutureStockAdapter } from './future-stock.adapter';
import { FutureStockConnector } from './future-stock.connector';

const userId = 'userId1';
const productCode = 'productCode1';
const productCodes = 'productCode1, productCode2';

class MockFutureStockAdapter implements Partial<FutureStockAdapter> {
  getFutureStock = vi.fn().mockImplementation(
    (productCode: string, userId: string) =>
      of(`getFutureStock-${userId}-${productCode}`)
  );

  getFutureStocks = vi.fn().mockImplementation((productCodes: string, userId: string) =>
    of(`getFutureStocks-${userId}-${productCodes}`)
  );
}

describe('FutureStockConnector', () => {
  let service: FutureStockConnector;
  let adapter: FutureStockAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FutureStockConnector,
        { provide: FutureStockAdapter, useClass: MockFutureStockAdapter },
      ],
    });

    service = TestBed.inject(FutureStockConnector);
    adapter = TestBed.inject(FutureStockAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFutureStock should call adapter', () => {
    let result;
    service
      .getFutureStock(productCode, userId)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`getFutureStock-${userId}-${productCode}`);
    expect(adapter.getFutureStock).toHaveBeenCalledWith(productCode, userId);
  });

  it('getFutureStocks should call adapter', () => {
    let result;
    service
      .getFutureStocks(productCodes, userId)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`getFutureStocks-${userId}-${productCodes}`);
    expect(adapter.getFutureStocks).toHaveBeenCalledWith(productCodes, userId);
  });
});
