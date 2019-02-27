import { TestBed } from '@angular/core/testing';
import {
  PageType,
  Product,
  ProductService,
  RoutingService
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

import { CurrentProductService } from './current-product.service';

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: { productCode: '123456' },
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false
  }
};

class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}

const mockProduct: Product = { name: 'mockProduct' };

class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('CurrentProductService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CurrentProductService,
        {
          provide: ProductService,
          useClass: MockProductService
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService
        }
      ]
    });

    service = TestBed.get(CurrentProductService);
  });

  it('should fetch product data', () => {
    let result: Product;
    service.getProduct().subscribe(product => (result = product));
    expect(result).toEqual(mockProduct);
  });
});
