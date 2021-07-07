import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { of } from 'rxjs';
import { QuickOrderAdapter } from './quick-order.adapter';
import { QuickOrderConnector } from './quick-order.connector';

import createSpy = jasmine.createSpy;

const mockProductCode = '123456789';
const mockProduct: Product = {
  code: mockProductCode,
};

class MockQuickOrderAdapter implements Partial<QuickOrderAdapter> {
  search = createSpy().and.returnValue(of(mockProduct));
}

describe('QuickOrderConnector', () => {
  let adapter: QuickOrderAdapter;
  let connector: QuickOrderConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuickOrderConnector,
        { provide: QuickOrderAdapter, useClass: MockQuickOrderAdapter },
      ],
    });

    connector = TestBed.inject(QuickOrderConnector);
    adapter = TestBed.inject(QuickOrderAdapter);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should search product', () => {
    connector.search(mockProductCode);
    expect(adapter.search).toHaveBeenCalledWith(mockProductCode);
  });
});
