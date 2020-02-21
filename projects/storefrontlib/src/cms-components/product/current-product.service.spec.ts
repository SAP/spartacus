import { TestBed } from '@angular/core/testing';
import {
  FeatureConfigService,
  PageType,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from './current-product.service';

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: { productCode: '123456' },
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false,
  },
};

class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}

const mockProduct: Product = { name: 'mockProduct' };
const mockProductWithAttributes: Product = {
  name: 'mockProduct',
  classifications: [{}],
};

class MockProductService {
  get(_code: string, scope?: string): Observable<Product> {
    if (scope && scope === 'attributes') {
      return of(mockProductWithAttributes);
    }

    return of(mockProduct);
  }
}

class MockFeatureConfigService {
  isLevel = () => true;
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
          useClass: MockProductService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    });

    service = TestBed.inject(CurrentProductService);
  });

  it('should fetch product data', () => {
    let result: Product;
    service.getProduct().subscribe(product => (result = product));
    expect(result).toEqual(mockProduct);
  });

  it('should fetch product attributes', () => {
    let result: Product;
    service.getProduct('attributes').subscribe(product => (result = product));
    expect(result).toEqual(mockProductWithAttributes);
  });
});
