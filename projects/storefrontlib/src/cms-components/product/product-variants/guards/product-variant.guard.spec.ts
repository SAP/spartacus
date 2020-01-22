import { ProductVariantGuard } from '@spartacus/storefront';
import { Product, ProductService, RoutingService } from '@spartacus/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Type } from '@angular/core';
import { Observable, of } from 'rxjs';

const mockPurchasableProduct = {
  productCode: 'purchasableTest123',
  purchasable: true,
};

const mockNonPurchasableProduct = {
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
  goByUrl() {
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

    guard = TestBed.get(ProductVariantGuard as Type<ProductVariantGuard>);
    productService = TestBed.get(ProductService as Type<ProductService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  });

  it('should return true if product is purchasable', done => {
    spyOn(productService, 'get').and.returnValue(of(mockPurchasableProduct));

    guard.canActivate().subscribe(val => {
      expect(val).toBeTruthy();
      done();
    });
  });

  it('should return true if product is purchasable', done => {
    spyOn(productService, 'get').and.returnValue(of(mockNonPurchasableProduct));
    spyOn(routingService, 'goByUrl').and.stub();

    guard.canActivate().subscribe(val => {
      expect(val).toBeFalsy();
      expect(routingService.goByUrl).toHaveBeenCalledWith(
        `product/${mockNonPurchasableProduct.variantOptions[0].code}`
      );
      done();
    });
  });
});
