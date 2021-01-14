import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Product,
  ProductService,
  RoutingConfig,
  SemanticPathService,
} from '@spartacus/core';
import { ProductVariantGuard } from '@spartacus/storefront';
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

const mockMultidimensionalProductAndPurchasable = {
  name: 'multidimensionalProduct',
  productCode: 'multidimensionalTest123',
  purchasable: true,
  multidimensional: true,
  variantMatrix: [
    {
      variantOption: {
        code: 'multidimensionalVariantTest123',
      },
    },
  ],
};

const mockMultidimensionalProductAndWithOutPurchasable = {
  name: 'multidimensionalProduct',
  productCode: 'multidimensionalTest123',
  purchasable: false,
  multidimensional: true,
  variantMatrix: [
    {
      variantOption: {
        code: 'multidimensionalVariantTest123',
      },
    },
  ],
};

const mockMultidimensionalProductWithVariantMAtrix = {
  name: 'multidimensionalProduct',
  productCode: 'multidimensionalTest123',
  multidimensional: true,
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

describe('ProductVariantGuard', () => {
  let guard: ProductVariantGuard;
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
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(ProductVariantGuard);
    productService = TestBed.inject(ProductService);
  });

  fdescribe('canActivate', () => {
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

    // Gen 1 variants
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

    // Mutli-D variants
    describe('product with multidimensional parameter', () => {
      describe('and product has variantMatrix', () => {
        it('should return true if product is purchasable', (done) => {
          spyOn(productService, 'get').and.returnValue(
            of(mockMultidimensionalProductAndPurchasable)
          );

          guard
            .canActivate(activatedRoute)
            .pipe(take(1))
            .subscribe((val) => {
              expect(val).toBeTruthy();
              done();
            });
        });

        it('should return url if product is not purchasable and navigate to product variatn page', (done) => {
          spyOn(productService, 'get').and.returnValue(
            of(mockMultidimensionalProductAndWithOutPurchasable)
          );

          guard
            .canActivate(activatedRoute)
            .pipe(take(1))
            .subscribe((val) => {
              expect(val.toString()).toEqual(
                '/product/multidimensionalVariantTest123/multidimensionalProduct'
              );
              done();
            });
        });
      });

      describe('and product has not variantMatrix', () => {
        it('should return true', (done) => {
          spyOn(productService, 'get').and.returnValue(
            of(mockMultidimensionalProductWithVariantMAtrix)
          );

          guard
            .canActivate(activatedRoute)
            .pipe(take(1))
            .subscribe((val) => {
              expect(val).toBeTruthy();
              done();
            });
        });
      });
    });
  });
});
