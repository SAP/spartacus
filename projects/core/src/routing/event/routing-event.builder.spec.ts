import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Breadcrumb,
  PageContext,
  PageType,
  ProductSearchPage,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import { RoutingEventBuilder } from './routing-event.builder';

describe('RoutingEventBuilder', () => {
  let service: RoutingEventBuilder;

  let mockRouterEvents: Subject<PageContext>;
  let mockRoutingService;

  let mockSearchEvents: Subject<ProductSearchPage>;
  let mockProductSearchService;

  beforeEach(() => {
    mockRouterEvents = new Subject();
    mockRoutingService = {
      getPageContext() {
        return mockRouterEvents;
      },
    };

    mockSearchEvents = new Subject();
    mockProductSearchService = {
      getResults() {
        return mockSearchEvents;
      },
    };

    TestBed.configureTestingModule({
      providers: [
        RoutingEventBuilder,
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: ProductSearchService,
          useValue: mockProductSearchService,
        },
      ],
    });

    service = TestBed.get(RoutingEventBuilder as Type<RoutingEventBuilder>);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('buildProductDetailsPageVisitEvent', () => {
    it('should emit when PRODUCT_PAGE page is visited', () => {
      const pdpId = '1234';

      let result: string;
      service
        .buildProductDetailsPageVisitEvent()
        .subscribe(value => (result = value));
      expect(result).toEqual(undefined);

      mockRouterEvents.next({
        id: pdpId,
        type: PageType.PRODUCT_PAGE,
      });
      expect(result).toEqual(pdpId);
    });
  });

  describe('buildCategoryPageVisitEvent', () => {
    it('should emit when a category page is visited', () => {
      const categoryId = '1234';

      let result: string;
      service
        .buildCategoryPageVisitEvent()
        .subscribe(value => (result = value));
      expect(result).toEqual(undefined);

      mockRouterEvents.next({
        id: categoryId,
        type: PageType.CATEGORY_PAGE,
      });
      expect(result).toEqual(categoryId);
    });
    it('should emit when a brand page is visited', () => {
      const brandId = 'brand-id';

      let result: string;
      service
        .buildCategoryPageVisitEvent()
        .subscribe(value => (result = value));
      expect(result).toEqual(undefined);

      mockRouterEvents.next({
        id: brandId,
        type: PageType.CATEGORY_PAGE,
      });
      expect(result).toEqual(brandId);
    });
  });

  describe('buildCategoryFacetChangeEvent', () => {
    it('should emit when CATEGORY_PAGE page is visited', () => {
      const mockFacets: Breadcrumb[] = [
        {
          facetCode: 'category',
          facetValueName: 'xxx',
        },
        {
          facetCode: 'brand',
          facetValueName: 'yyy',
        },
      ];

      let results: Breadcrumb[];
      service
        .buildCategoryFacetChangeEvent()
        .subscribe(value => (results = value));

      mockRouterEvents.next({
        id: '1234',
        type: PageType.CATEGORY_PAGE,
      });
      mockSearchEvents.next({ breadcrumbs: mockFacets });
      expect(results).toEqual([mockFacets[0]]);
    });
    it('should emit when search results page is visited', () => {
      const mockFacets: Breadcrumb[] = [
        {
          facetCode: 'category',
          facetValueName: 'xxx',
        },
        {
          facetCode: 'brand',
          facetValueName: 'yyy',
        },
      ];

      let results: Breadcrumb[];
      service
        .buildCategoryFacetChangeEvent()
        .subscribe(value => (results = value));

      mockRouterEvents.next({
        id: 'search',
        type: PageType.CONTENT_PAGE,
      });
      mockSearchEvents.next({ breadcrumbs: mockFacets });
      expect(results).toEqual([mockFacets[0]]);
    });
  });

  describe('buildBrandFacetChangeEvent', () => {
    it('should emit when CATEGORY_PAGE page is visited', () => {
      const mockFacets: Breadcrumb[] = [
        {
          facetCode: 'brand',
          facetValueName: 'xxx',
        },
        {
          facetCode: 'category',
          facetValueName: 'yyy',
        },
      ];

      let results: Breadcrumb[];
      service
        .buildBrandFacetChangeEvent()
        .subscribe(value => (results = value));

      mockRouterEvents.next({
        id: '1234',
        type: PageType.CATEGORY_PAGE,
      });
      mockSearchEvents.next({ breadcrumbs: mockFacets });
      expect(results).toEqual([mockFacets[0]]);
    });
    it('should emit when search results page is visited', () => {
      const mockFacets: Breadcrumb[] = [
        {
          facetCode: 'brand',
          facetValueName: 'xxx',
        },
        {
          facetCode: 'category',
          facetValueName: 'yyy',
        },
      ];

      let results: Breadcrumb[];
      service
        .buildBrandFacetChangeEvent()
        .subscribe(value => (results = value));

      mockRouterEvents.next({
        id: 'search',
        type: PageType.CONTENT_PAGE,
      });
      mockSearchEvents.next({ breadcrumbs: mockFacets });
      expect(results).toEqual([mockFacets[0]]);
    });
  });
});
