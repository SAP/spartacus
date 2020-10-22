import { TestBed } from '@angular/core/testing';
import {
  FeatureConfigService,
  PageType,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CurrentProductService } from './current-product.service';

const mockRouter = {
  state: {
    url: '/',
    queryParams: {},
    params: { productCode: '123456' },
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false,
  },
};

const mockRouter$ = new BehaviorSubject<{ state: object }>(mockRouter);

class MockRoutingService {
  getRouterState() {
    return mockRouter$.asObservable();
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
  let currentProductService: CurrentProductService;
  let routingService: RoutingService;
  let productService: ProductService;

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

    currentProductService = TestBed.inject(CurrentProductService);
    routingService = TestBed.inject(RoutingService);
    productService = TestBed.inject(ProductService);

    spyOn(routingService, 'getRouterState').and.callThrough();
    spyOn(productService, 'get').and.callThrough();
  });

  it('should fetch product data', () => {
    let result: Product;

    currentProductService
      .getProduct()
      .subscribe((product) => (result = product))
      .unsubscribe();

    expect(result).toEqual(mockProduct);
  });

  it('should not emit old product data and fetch NEW product data', () => {
    const mockRouterNewProductCode = {
      ...mockRouter,
      state: { ...mockRouter.state, params: { productCode: 'abc' } },
    };

    currentProductService.getProduct().subscribe();

    expect(productService.get).toHaveBeenCalledWith(
      mockRouter.state.params.productCode,
      currentProductService['DEFAULT_PRODUCT_SCOPE']
    );

    mockRouter$.next(mockRouterNewProductCode);

    expect(productService.get).toHaveBeenCalledWith(
      mockRouterNewProductCode.state.params.productCode,
      currentProductService['DEFAULT_PRODUCT_SCOPE']
    );
  });

  it('should fetch product attributes', () => {
    let result: Product;
    currentProductService
      .getProduct('attributes')
      .subscribe((product) => (result = product))
      .unsubscribe();
    expect(result).toEqual(mockProductWithAttributes);
  });

  it('should return null if not on product route', () => {
    const mockRouterEmptyProductCode = { state: { params: {} } };

    mockRouter$.next(mockRouterEmptyProductCode);

    let result: Product;
    currentProductService
      .getProduct()
      .subscribe((product) => (result = product))
      .unsubscribe();
    expect(result).toBe(null);
  });
});
