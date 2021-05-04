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
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { VariantsMultiDimensionalGuard } from './variants-multi-dimensional.guard';

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
class MockSemanticPathService implements Partial<SemanticPathService> {
  transform(_commands: UrlCommands): any[] {
    return [];
  }
}

describe('VariantsMultiDimensionalGuard', () => {
  let guard: VariantsMultiDimensionalGuard;
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

    guard = TestBed.inject(VariantsMultiDimensionalGuard);
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
