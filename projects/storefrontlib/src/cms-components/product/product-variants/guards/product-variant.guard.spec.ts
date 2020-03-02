import { ProductVariantGuard } from '@spartacus/storefront';
import { Product, ProductService, RoutingService } from '@spartacus/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

const mockPurchasableProduct = {
  name: 'purchasableProduct',
  productCode: 'purchasableTest123',
  purchasable: true,
};

const mockNonPurchasableProduct = {
  name: 'nonPurchasableProduct',
  productCode: 'purchasableTest123',
  purchasable: false,
  variantOptions: [
    {
      code: 'mock_code_3',
      stock: { stockLevel: 15 },
    },
    {
      code: 'mock_code_4',
      stock: { stockLevel: 0 },
    },
  ],
};

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of({
      nextState: {
        params: {
          productCode: 'test123',
        },
      },
    });
  }
  go() {
    return of();
  }
}

class MockProductService {
  get(): Observable<Product> {
    return of();
  }
}

describe('ProductVariantGuard', () => {
  let guard: ProductVariantGuard;
  let productService: ProductService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(ProductVariantGuard);
    productService = TestBed.inject(ProductService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should return true if product is purchasable', done => {
    spyOn(productService, 'get').and.returnValue(of(mockPurchasableProduct));

    guard.canActivate().subscribe(val => {
      expect(val).toBeTruthy();
      done();
    });
  });

  it('should return false and redirect if product is non-purchasable', done => {
    spyOn(productService, 'get').and.returnValue(of(mockNonPurchasableProduct));
    spyOn(routingService, 'go').and.stub();

    guard.canActivate().subscribe(val => {
      expect(val).toBeFalsy();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'product',
        params: mockNonPurchasableProduct,
      });
      done();
    });
  });

  it('should return true if no productCode in route parameter (launch from smartedit)', done => {
    spyOn(routingService, 'getRouterState').and.returnValue(
      of({
        nextState: {
          params: {},
        },
      } as any)
    );

    guard.canActivate().subscribe(val => {
      expect(val).toBeTruthy();
      done();
    });
  });
});
