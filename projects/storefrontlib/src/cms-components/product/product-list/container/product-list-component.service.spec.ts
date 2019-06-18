import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductSearchService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { ProductListComponentService } from './product-list-component.service';

export class MockRoutingService {
  go = jasmine.createSpy('go');
  getRouterState() {}
}

export class MockProductSearchService {
  getResults = jasmine
    .createSpy('getResults')
    .and.returnValue(of({ products: [] }));
  search = jasmine.createSpy('search');
  clearResults = jasmine.createSpy('clearResults');
}

function mockRoutingState(
  routing: RoutingService,
  state: { params?: object; queryParams?: object }
) {
  spyOn(routing, 'getRouterState').and.returnValue(
    of({
      state: {
        params: state.params || {},
        queryParams: state.queryParams || {},
      },
    })
  );
}

fdescribe('ProductListComponentService', () => {
  let service: ProductListComponentService;
  let routing: RoutingService;
  let activatedRoute: ActivatedRoute;
  let productSearchService: ProductSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductListComponentService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActivatedRoute, useValue: 'ActivatedRoute' },
        { provide: ProductSearchService, useClass: MockProductSearchService },
      ],
    });

    service = TestBed.get(ProductListComponentService);
    routing = TestBed.get(RoutingService);
    activatedRoute = TestBed.get(ActivatedRoute);
    productSearchService = TestBed.get(ProductSearchService);
  });

  it('setQuery should set query param "query" in the url', () => {
    service.setQuery('testQuery');
    expect(routing.go).toHaveBeenCalledWith([], null, {
      queryParams: { query: 'testQuery' },
      queryParamsHandling: 'merge',
      relativeTo: activatedRoute,
    });
  });

  it('viewPage should set query param "currentPage" in the url', () => {
    service.viewPage(123);
    expect(routing.go).toHaveBeenCalledWith([], null, {
      queryParams: { currentPage: 123 },
      queryParamsHandling: 'merge',
      relativeTo: activatedRoute,
    });
  });

  it('sort should set query param "sortCode" in the url', () => {
    service.sort('testSortCode');
    expect(routing.go).toHaveBeenCalledWith([], null, {
      queryParams: { sortCode: 'testSortCode' },
      queryParamsHandling: 'merge',
      relativeTo: activatedRoute,
    });
  });

  it('getSearchResults return search results', () => {
    let result;
    service.getSearchResults().subscribe(res => (result = res));
    expect(result).toEqual({ products: [] });
  });

  describe('onInit should search by route', () => {
    it('with default "pageSize" 10', () => {
      mockRoutingState(routing, {});

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(undefined, {
        pageSize: 10,
      });
    });

    it('param "categoryCode"', () => {
      mockRoutingState(routing, {
        params: { categoryCode: 'testCategory' },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        ':relevance:category:testCategory',
        jasmine.any(Object)
      );
    });

    it('param "brandCode"', () => {
      mockRoutingState(routing, {
        params: { brandCode: 'testBrand' },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        ':relevance:brand:testBrand',
        jasmine.any(Object)
      );
    });

    it('param "query"', () => {
      mockRoutingState(routing, {
        params: { query: 'testQuery' },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        'testQuery',
        jasmine.any(Object)
      );
    });

    it('query param "query"', () => {
      mockRoutingState(routing, {
        queryParams: { query: 'testQuery' },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        'testQuery',
        jasmine.any(Object)
      );
    });

    it('param "query" and query param "query"', () => {
      mockRoutingState(routing, {
        params: { query: 'testQuery1' },
        queryParams: { query: 'testQuery2' },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        'testQuery2',
        jasmine.any(Object)
      );
    });

    it('query param "currentPage"', () => {
      mockRoutingState(routing, {
        params: { query: 'testQuery' },
        queryParams: { currentPage: 123 },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        'testQuery',
        jasmine.objectContaining({ currentPage: 123 })
      );
    });

    it('query param "pageSize"', () => {
      mockRoutingState(routing, {
        params: { query: 'testQuery' },
        queryParams: { pageSize: 20 },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        'testQuery',
        jasmine.objectContaining({ pageSize: 20 })
      );
    });

    it('query param "sortCode"', () => {
      mockRoutingState(routing, {
        params: { query: 'testQuery' },
        queryParams: { sortCode: 'name-asc' },
      });

      service.onInit();
      expect(productSearchService.search).toHaveBeenCalledWith(
        'testQuery',
        jasmine.objectContaining({ sortCode: 'name-asc' })
      );
    });
  });
});
