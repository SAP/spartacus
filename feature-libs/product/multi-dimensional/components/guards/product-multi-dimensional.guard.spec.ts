import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Product,
  ProductService,
  RoutingConfig,
  SemanticPathService,
  UrlCommands,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductMultiDimensionalGuard } from './product-multi-dimensional.guard';

const mockMultidimensionalProductAndPurchasable = {
  name: 'multidimensionalProduct',
  code: 'multidimensionalTest123',
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
  code: 'multidimensionalTest123',
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

const mockMultidimensionalProductWithVariantMatrix = {
  name: 'multidimensionalProduct',
  code: 'multidimensionalTest123',
  multidimensional: true,
  variantMatrix: [],
};

const activatedRoute = {
  params: {
    productCode: 'test123',
  },
} as unknown as ActivatedRouteSnapshot;

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

describe('ProductMultiDimensionalGuard', () => {
  let guard: ProductMultiDimensionalGuard;
  let productService: ProductService;
  let semanticPathService: MockSemanticPathService;
  let router: Router;

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

    guard = TestBed.inject(ProductMultiDimensionalGuard);
    productService = TestBed.inject(ProductService);
    semanticPathService = TestBed.inject(SemanticPathService);
    router = TestBed.inject(Router);
  });

  describe('canActivate', () => {
    it('should return true if no productCode in route parameter (launch from smartedit)', (done) => {
      const activatedRouteWithoutParams = {
        params: {},
      } as unknown as ActivatedRouteSnapshot;

      guard
        .canActivate(activatedRouteWithoutParams)
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBeTruthy();
          done();
        });
    });

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

        it('should return url if product is not purchasable and navigate to product variant page', (done) => {
          spyOn(productService, 'get').and.returnValue(
            of(mockMultidimensionalProductAndWithOutPurchasable)
          );

          spyOn(semanticPathService, 'transform').and.returnValue([
            `/product/${mockMultidimensionalProductAndWithOutPurchasable.variantMatrix[0].variantOption.code}/${mockMultidimensionalProductAndWithOutPurchasable.name}`,
          ]);

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

      describe('and product has no variantMatrix', () => {
        it('should return true', (done) => {
          spyOn(productService, 'get').and.returnValue(
            of(mockMultidimensionalProductWithVariantMatrix)
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
