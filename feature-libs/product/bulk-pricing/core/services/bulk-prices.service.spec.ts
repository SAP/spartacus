import { TestBed } from '@angular/core/testing';
import { Product, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { BulkPricesService } from './bulk-prices.service';

const mockProducts = {
  1: {
    code: '1',
    name: 'product 1',
    price: {
      formattedValue: '100.00',
    },
    images: {
      PRIMARY: {
        product: {
          url: 'whatever.jpg',
        },
      },
    },
  },
  2: {
    code: '2',
    name: 'product 2',
    price: {
      formattedValue: '200.00',
    },
  },
};

class MockProductService {
  get(code): Observable<Product> {
    return of(mockProducts[code]);
  }
}

describe('BulkPricesService', () => {
  let service: BulkPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        
      ],
    });
    
    service = TestBed.inject(BulkPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
