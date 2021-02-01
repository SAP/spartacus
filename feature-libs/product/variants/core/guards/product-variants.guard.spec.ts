import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Product,
  ProductService,
  RoutingConfig,
  SemanticPathService,
  UrlCommands,
} from '@spartacus/core';
import { ProductVariantsGuard } from '@spartacus/product/variants/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

const mockPurchasableProduct = {
  name: 'purchasableProduct',
  productCode: 'purchasableTest123',
  purchasable: true,
  multidimensional: false,
};

const mockNonPurchasableProduct = {
  name: 'nonPurchasableProduct',
  productCode: 'purchasableTest123',
  purchasable: false,
  multidimensional: false,
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

const activatedRoute = ({
  params: {
    productCode: 'test123',
  },
} as unknown) as ActivatedRouteSnapshot;

class MockProductService implements Partial<ProductService> {
  get(): Observable<Product> {
    return of();
  }
}
class MockSemanticPathService implements Partial<SemanticPathService> {
  transform(_commands: UrlCommands): any[] {
    return [];
  }
}

describe('ProductVariantsGuard', () => {
  let guard: ProductVariantsGuard;
  let productService: ProductService;
  let semanticPathService: MockSemanticPathService;

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
                  paramsMapping: { productCode: 'code' },
                },
              },
            },
          },
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(ProductVariantsGuard);
    productService = TestBed.inject(ProductService);
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  describe('canActivate', () => {
    it('should return true if no productCode in route parameter (launch from smartedit)', (done) => {
      const activatedRouteWithoutParams = ({
        params: {},
      } as unknown) as ActivatedRouteSnapshot;

      guard
        .canActivate(activatedRouteWithoutParams)
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBeTruthy();
          done();
        });
    });

    describe('product without multidimensional parameter', () => {
      it('should return true if product is purchasable', (done) => {
        spyOn(productService, 'get').and.returnValue(
          of(mockPurchasableProduct)
        );

        guard
          .canActivate(activatedRoute)
          .pipe(take(1))
          .subscribe((val) => {
            expect(val).toBeTruthy();
            done();
          });
      });

      it('should return url for product variant if product is non-purchasable', (done) => {
        spyOn(productService, 'get').and.returnValue(
          of(mockNonPurchasableProduct)
        );

        spyOn(semanticPathService, 'transform').and.returnValue([
          `/product/${mockNonPurchasableProduct.productCode}/${mockNonPurchasableProduct.name}`,
        ]);

        guard
          .canActivate(activatedRoute)
          .pipe(take(1))
          .subscribe((val) => {
            expect(val.toString()).toEqual(
              '/product/purchasableTest123/nonPurchasableProduct'
            );
            done();
          });
      });
    });
  });
});
