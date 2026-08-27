import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
  Product,
  ProductService,
  RoutingConfig,
  SemanticPathService,
} from '@spartacus/core';
import { EMPTY, Observable, firstValueFrom, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { vi } from 'vitest';
import { ProductVariantsGuard } from './product-variants.guard';

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

const activatedRoute = {
  params: {
    productCode: 'test123',
  },
} as unknown as ActivatedRouteSnapshot;

class MockProductService implements Partial<ProductService> {
  get(): Observable<Product> {
    return EMPTY;
  }
}

describe('ProductVariantsGuard', () => {
  let guard: ProductVariantsGuard;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingConfig,
          useValue: {
            routing: {
              routes: {
                product: {
                  paths: ['product/:productCode/:name'],
                },
              },
            },
          },
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        SemanticPathService,
      ],
    });

    guard = TestBed.inject(ProductVariantsGuard);
    productService = TestBed.inject(ProductService);
  });

  it('should return true if product is purchasable', async () => {
    vi.spyOn(productService, 'get').mockReturnValue(of(mockPurchasableProduct));

    const val = await firstValueFrom(
      guard.canActivate(activatedRoute).pipe(take(1))
    );
    expect(val).toBeTruthy();
  });

  it('should return url for product variant if product is non-purchasable', async () => {
    vi.spyOn(productService, 'get').mockReturnValue(
      of(mockNonPurchasableProduct)
    );

    const val = await firstValueFrom(
      guard.canActivate(activatedRoute).pipe(take(1))
    );
    expect(val.toString()).toEqual(
      '/product/purchasableTest123/nonPurchasableProduct'
    );
  });

  it('should return true if no productCode in route parameter (launch from smartedit)', async () => {
    const activatedRouteWithoutParams = {
      params: {},
    } as unknown as ActivatedRouteSnapshot;

    const val = await firstValueFrom(
      guard.canActivate(activatedRouteWithoutParams).pipe(take(1))
    );
    expect(val).toBeTruthy();
  });
});
