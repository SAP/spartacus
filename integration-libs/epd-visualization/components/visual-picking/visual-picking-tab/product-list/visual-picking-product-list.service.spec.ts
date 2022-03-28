import { TestBed } from '@angular/core/testing';
import {
  Product,
  ProductReference,
  ProductReferenceService,
  ProductScope,
  provideConfigFactory,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { getEpdVisualizationDefaultConfig } from '@spartacus/epd-visualization/root';
import { CurrentProductService } from '@spartacus/storefront';
import { from, Observable, of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { getTestConfig } from '../../../../root/testing/epd-visualization-test-config';
import { VisualPickingProductFilterService } from '../product-filter/visual-picking-product-filter.service';
import { VisualPickingProductListItem } from './model/visual-picking-product-list-item.model';
import { VisualPickingProductListService } from './visual-picking-product-list.service';

const SPAREPART = 'SPAREPART';

const currentProduct: Product = {
  code: 'currentProduct',
};

const sparePart1: ProductReference = {
  referenceType: SPAREPART,
  target: {
    code: 'sparePart1',
  },
};

const sparePart2: ProductReference = {
  referenceType: SPAREPART,
  target: {
    code: 'sparePart2',
  },
};

const sparePart3: ProductReference = {
  referenceType: SPAREPART,
  target: {
    code: 'sparePart3',
    name: '2',
  },
};

const productReferences = [sparePart1, sparePart2, sparePart3];

class MockCurrentProductService {
  getProduct(
    scopes?: (ProductScope | string)[] | ProductScope | string
  ): Observable<Product | null> {
    expect(scopes).toBeUndefined();

    return of(currentProduct);
  }
}

class MockProductReferenceService {
  private _productReferences: ProductReference[] = [];

  loadProductReferences(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): void {
    expect(productCode).toBe(currentProduct.code);
    expect(referenceType).toBe(SPAREPART);
    expect(pageSize).toBeUndefined();

    this._productReferences = productReferences;
  }

  getProductReferences(
    productCode: string,
    referenceType: string
  ): Observable<ProductReference[]> {
    expect(productCode).toBe(currentProduct.code);
    expect(referenceType).toBe(SPAREPART);

    return of(this._productReferences);
  }

  cleanReferences(): void {
    this._productReferences = [];
  }
}

class MockVisualPickingProductFilterService {
  set filter(filter: string) {
    expect(filter).toBe('2');
    this._filter = filter;
  }
  get filter() {
    return this._filter;
  }
  _filter = '';

  getFilteredProducts(
    _unfilteredProductReferences$: Observable<ProductReference[]>
  ): Observable<ProductReference[]> {
    return of([sparePart2, sparePart3]);
  }
}

describe('VisualPickingProductListService', () => {
  let visualPickingProductListService: VisualPickingProductListService;
  let visualPickingProductFilterService: VisualPickingProductFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideConfigFactory(getTestConfig),
        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: ProductReferenceService,
          useClass: MockProductReferenceService,
        },
        {
          provide: VisualPickingProductFilterService,
          useClass: MockVisualPickingProductFilterService,
        },
      ],
    }).compileComponents();

    visualPickingProductListService = TestBed.inject(
      VisualPickingProductListService
    );

    visualPickingProductFilterService = TestBed.inject(
      VisualPickingProductFilterService
    );
  });

  describe('getProductReferences()', () => {
    it('should filter out undefined values returned by ProductReferenceService', (done) => {
      visualPickingProductListService['currentProduct$'] = of(currentProduct);

      spyOn(
        visualPickingProductListService['productReferenceService'],
        'loadProductReferences'
      );

      const fromValues: ArrayLike<ProductReference[] | undefined> = [
        undefined,
        productReferences,
      ];

      spyOn(
        visualPickingProductListService['productReferenceService'],
        'getProductReferences'
      ).and.returnValue(from(fromValues));

      visualPickingProductListService
        .getProductReferences()
        .subscribe((productRefs: ProductReference[]) => {
          expect(productRefs).toEqual(productReferences);
          done();
        });

      visualPickingProductListService.initialize();
    });

    it('should produce one value for each distinct set of product references', (done) => {
      visualPickingProductListService['currentProduct$'] = of(currentProduct);

      spyOn(
        visualPickingProductListService['productReferenceService'],
        'loadProductReferences'
      );

      const oneProductReference = [sparePart1];

      const fromValues: ArrayLike<ProductReference[]> = [
        [],
        [],
        oneProductReference,
        oneProductReference,
        productReferences,
      ];
      spyOn(
        visualPickingProductListService['productReferenceService'],
        'getProductReferences'
      ).and.returnValue(from(fromValues));

      let count = 0;
      visualPickingProductListService
        .getProductReferences()
        .subscribe((productRefs: ProductReference[]) => {
          if (count === 0) {
            expect(productRefs).toEqual([]);
          } else if (count === 1) {
            expect(productRefs).toEqual(oneProductReference);
          } else {
            expect(productRefs).toEqual(productReferences);
            done();
          }
          count++;
        });

      visualPickingProductListService.initialize();
    });
  });

  describe('getCurrentProductReferences', () => {
    it('should produce product references for the current product', (done) => {
      visualPickingProductListService
        .getProductReferences()
        .subscribe((productReferences: ProductReference[]) => {
          expect(productReferences).toBeTruthy();
          expect(productReferences.length).toBe(3);
          expect(productReferences[0].referenceType).toBe(SPAREPART);
          expect(productReferences[0].target?.code).toBe(
            sparePart1.target?.code
          );
          expect(productReferences[1].referenceType).toBe(SPAREPART);
          expect(productReferences[1].target?.code).toBe(
            sparePart2.target?.code
          );
          expect(productReferences[2].referenceType).toBe(SPAREPART);
          expect(productReferences[2].target?.code).toBe(
            sparePart3.target?.code
          );
          done();
        });

      visualPickingProductListService.initialize();
    });
  });

  describe('getFilteredProductReferences', () => {
    it('should produce product references for the current product that have been filtered by the VisualPickingProductFilterService', (done) => {
      visualPickingProductFilterService.filter = '2';
      visualPickingProductListService
        .getFilteredProductReferences()
        .subscribe((filteredProductReferences: ProductReference[]) => {
          expect(filteredProductReferences).toBeTruthy();
          expect(filteredProductReferences.length).toBe(2);
          expect(filteredProductReferences[0].referenceType).toBe(SPAREPART);
          expect(filteredProductReferences[0].target?.code).toBe(
            sparePart2.target?.code
          );
          expect(filteredProductReferences[1].referenceType).toBe(SPAREPART);
          expect(filteredProductReferences[1].target?.code).toBe(
            sparePart3.target?.code
          );
          done();
        });
    });
  });

  describe('getVisualPickingProductListItems', () => {
    it('should create VisualPickingProductListItem from provided product references and list of selected product codes', () => {
      visualPickingProductListService
        .getVisualPickingProductListItems(
          of([sparePart1, sparePart2, sparePart3]),
          of([
            sparePart1.target?.code as string,
            sparePart3.target?.code as string,
          ])
        )
        .subscribe(
          (visualPickingProductListItems: VisualPickingProductListItem[]) => {
            expect(visualPickingProductListItems).toBeTruthy();
            expect(visualPickingProductListItems.length).toBe(3);
            expect(visualPickingProductListItems[0].selected).toBe(true);
            expect(visualPickingProductListItems[0].product?.code).toBe(
              sparePart1.target?.code
            );
            expect(visualPickingProductListItems[1].selected).toBe(false);
            expect(visualPickingProductListItems[1].product?.code).toBe(
              sparePart2.target?.code
            );
            expect(visualPickingProductListItems[2].selected).toBe(true);
            expect(visualPickingProductListItems[2].product?.code).toBe(
              sparePart3.target?.code
            );
          }
        );
    });
  });

  describe('set selectedProductCodes', () => {
    it('activeSlideIndex should be updated if required', (done) => {
      visualPickingProductListService.itemsPerSlide = 1;

      const expectedSelectedProductCodes = ['sparePart3'];
      const expectedSelectedIndex = 1;

      expect(visualPickingProductListService.activeSlideStartIndex).toBe(0);

      visualPickingProductListService.filteredItems$
        .pipe(skip(1))
        .subscribe((filteredItems: VisualPickingProductListItem[]) => {
          expect(filteredItems.length).toEqual(2);
          expect(filteredItems[0].product.code).toEqual(
            sparePart2.target?.code
          );
          expect(filteredItems[0].selected).toEqual(false);

          expect(filteredItems[1].product.code).toEqual(
            sparePart3.target?.code
          );
          expect(filteredItems[1].selected).toEqual(true);

          setTimeout(() => {
            expect(visualPickingProductListService.activeSlideStartIndex).toBe(
              expectedSelectedIndex
            );

            done();
          }, 0);
        });

      visualPickingProductListService.initialize();

      expect(visualPickingProductListService.selectedProductCodes).toEqual([]);

      visualPickingProductListService.selectedProductCodes =
        expectedSelectedProductCodes;

      expect(visualPickingProductListService.selectedProductCodes).toEqual(
        expectedSelectedProductCodes
      );
    });
  });
});
