import { TestBed } from '@angular/core/testing';
import {
  PageType,
  ProductSearchPage,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { ProductListComponentService } from '../../container/product-list-component.service';
import { FacetList } from '../facet.model';
import { ProductFacetService } from './product-facet.service';

class MockRoutingService {
  getRouterState() {}
}

class MockProductListComponentService {
  model$: Observable<ProductSearchPage>;
}

describe('ProductFacetService', () => {
  let service: ProductFacetService;
  let routingService: RoutingService;
  let productListComponentService: ProductListComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductFacetService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ProductListComponentService,
          useClass: MockProductListComponentService,
        },
      ],
    });

    productListComponentService = TestBed.inject(ProductListComponentService);
  });

  describe('getFacetList()', () => {
    describe('category page', () => {
      const mockCategoryPage = {
        state: {
          context: {
            type: PageType.CATEGORY_PAGE,
            id: '123',
          },
          params: { categoryCode: '123' },
        },
      };

      const mockCategoryResult = {
        currentQuery: { query: { value: 'allCategories:123' } },
        facets: [{ name: 'facet-1' }],
        breadcrumbs: [
          { facetCode: 'any-code', facetName: 'active-facet-1' },
          { facetCode: 'allCategories', facetValueCode: '123' },
        ],
      } as ProductSearchPage;

      beforeEach(() => {
        routingService = TestBed.inject(RoutingService);
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockCategoryPage as any)
        );
        (productListComponentService.model$ as any) = of(mockCategoryResult);
        service = TestBed.inject(ProductFacetService);
      });

      it('should return facets', (done) => {
        let result: FacetList;
        service.facetList$
          .subscribe((facetList) => {
            result = facetList;
            expect(result.facets.length).toEqual(1);
            done();
          })
          .unsubscribe();
      });

      it('should return active facets', (done) => {
        let result: FacetList;
        service.facetList$
          .subscribe((facetList) => {
            result = facetList;
            expect(result.activeFacets?.length).toEqual(1);
            done();
          })
          .unsubscribe();
      });

      it('should not return active facets with category code', (done) => {
        let result: FacetList;
        service.facetList$
          .subscribe((facetList) => {
            result = facetList;
            expect(
              result.activeFacets?.find((f) => f.facetCode === 'allCategories')
            ).toBeFalsy();
            done();
          })
          .unsubscribe();
      });
    });

    describe('brand page', () => {
      const mockBrandPage = {
        state: {
          context: {
            type: PageType.CATEGORY_PAGE,
            id: '123',
          },
          params: { brandCode: 'brand_123', brandName: 'BrandName' },
        },
      };

      const mockBrandResult = {
        currentQuery: { query: { value: 'allCategories:123' } },
        facets: [{ name: 'facet-1' }],
        breadcrumbs: [
          { facetCode: 'allCategories', facetValueCode: 'brand_123' },
          { facetCode: 'availableInStores', facetValueCode: 'StoreName' },
          { facetCode: 'availableInStores', facetValueCode: 'StoreName2' },
        ],
      } as ProductSearchPage;

      beforeEach(() => {
        routingService = TestBed.inject(RoutingService);
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockBrandPage as any)
        );
        (productListComponentService.model$ as any) = of(mockBrandResult);
        service = TestBed.inject(ProductFacetService);
      });

      it('should return facets without brand facet', (done) => {
        let result: FacetList;
        service.facetList$
          .subscribe((facetList) => {
            result = facetList;
            expect(result.activeFacets?.length).toEqual(2);
            done();
          })
          .unsubscribe();
      });
    });

    describe('search page', () => {
      const mockSearchPage = {
        state: {
          context: {
            type: PageType.CONTENT_PAGE,
            id: 'search',
          },
          params: { query: 'canon:1' },
        },
      };

      const mockSearchResult = {
        currentQuery: { query: { value: 'canon:' } },
        facets: [{ name: 'facet1' }],
        freeTextSearch: 'canon',
      } as ProductSearchPage;

      beforeEach(() => {
        routingService = TestBed.inject(RoutingService);
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockSearchPage as any)
        );
        (productListComponentService.model$ as any) = of(mockSearchResult);
        service = TestBed.inject(ProductFacetService);
      });

      it('should return facets', (done) => {
        let result: FacetList;
        service.facetList$
          .subscribe((facetList) => {
            result = facetList;
            expect(result.facets.length).toEqual(1);
            done();
          })
          .unsubscribe();
      });
    });

    describe('non product listing page', () => {
      const mockAnyPage = {
        state: {
          context: {
            type: PageType.CONTENT_PAGE,
            id: 'any',
          },
        },
      };

      const mockResults = {
        facets: [
          {
            name: 'facet1',
          },
        ],
        freeTextSearch: 'canon',
      } as ProductSearchPage;

      beforeEach(() => {
        routingService = TestBed.inject(RoutingService);
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockAnyPage as RouterState)
        );

        (productListComponentService.model$ as any) = of(mockResults);
        service = TestBed.inject(ProductFacetService);
      });

      it('should not return result', (done) => {
        service.facetList$
          .pipe(isEmpty())
          .subscribe((result) => {
            // Expect observable.isEmpty to be true
            expect(result).toBeTruthy();
            done();
          })
          .unsubscribe();
      });
    });
  });
});
