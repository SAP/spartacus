import {
  Product,
  ProductService,
  RoutingService, PageType} from '@spartacus/core';
import { Observable, of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { YotpoConfig } from '../yotpoconfig/yotpo-config';

import { YotpoService } from './yotpo.service';


class MockYotpoConfig extends YotpoConfig {
  vendor = {
    yotpo: {
      appToken: 'abc'
    }
  };
}

const mockProduct: Product = { code: '123456' };

class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }
}

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

describe('YotpoService', () => {
  let service: YotpoService;
  beforeEach(() => { 
      TestBed.configureTestingModule({ providers: [ YotpoService,
        { provide: YotpoConfig, useClass: MockYotpoConfig }, 
        {
          provide: ProductService,
          useClass: MockProductService
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService
        }
      ]});

  service = TestBed.get(YotpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
