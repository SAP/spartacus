import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import {
  CurrencyService,
  LanguageService,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { ProductListComponentService } from './product-list-component.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
  scrollEvent = new Scroll(null, [100, 100], null);
  events = new Observable(observer => {
    observer.next(this.scrollEvent);
    observer.complete();
  });
}

const productSearch = new BehaviorSubject<any>({ products: [] });
class MockProductSearchService {
  search = jasmine.createSpy('search');
  clearResults = jasmine.createSpy('clearResults');
  getResults() {
    return productSearch;
  }
}

class MockCurrencyService {
  getActive() {
    return of(true);
  }
}
class MockLanguageService {
  getActive() {
    return of(true);
  }
}

describe('ProductListComponentService', () => {
  let service: ProductListComponentService;
  let activatedRoute: ActivatedRoute;
  let productSearchService: ProductSearchService;
  let router: Router;
  let routingState;

  function mockRoutingState(state: { params?: object; queryParams?: object }) {
    routingState.next({
      state: {
        params: state.params || {},
        queryParams: state.queryParams || {},
      },
    });
  }

  beforeEach(() => {
    routingState = new BehaviorSubject({
      state: { params: {}, queryParams: {} },
    });

    const mockRoutingService = {
      getRouterState: jasmine
        .createSpy('getRouterState')
        .and.returnValue(routingState),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductListComponentService,
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: 'ActivatedRoute' },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    });

    service = TestBed.get(ProductListComponentService as Type<
      ProductListComponentService
    >);
    router = TestBed.get(Router as Type<Router>);
    activatedRoute = TestBed.get(ActivatedRoute as Type<ActivatedRoute>);
    productSearchService = TestBed.get(ProductSearchService as Type<
      ProductSearchService
    >);
  });

  it('setQuery should set query param "query" in the url and reset "currentPage"', () => {
    service.setQuery('testQuery');
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { query: 'testQuery', currentPage: undefined },
      queryParamsHandling: 'merge',
      relativeTo: activatedRoute,
    });
  });

  it('viewPage should set query param "currentPage" in the url', () => {
    service.viewPage(123);
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { currentPage: 123 },
      queryParamsHandling: 'merge',
      relativeTo: activatedRoute,
    });
  });

  it('sort should set query param "sortCode" in the url', () => {
    service.sort('testSortCode');
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { sortCode: 'testSortCode' },
      queryParamsHandling: 'merge',
      relativeTo: activatedRoute,
    });
  });

  describe('model$', () => {
    it('should return search results', () => {
      let result;
      service.model$.subscribe(res => (result = res));
      expect(result).toEqual({ products: [] });
    });

    it('should set startNewSearch true when there is no search results', () => {
      productSearch.next({});
      service.model$.subscribe();
      expect(service['startNewSearch']).toBeTruthy();
    });

    describe('should perform search on change of routing', () => {
      it('with default "pageSize" 10', () => {
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(undefined, {
          pageSize: 10,
        });
      });

      it('param "categoryCode"', () => {
        mockRoutingState({
          params: { categoryCode: 'testCategory' },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          ':relevance:category:testCategory',
          jasmine.any(Object)
        );
      });

      it('param "brandCode"', () => {
        mockRoutingState({
          params: { brandCode: 'testBrand' },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          ':relevance:brand:testBrand',
          jasmine.any(Object)
        );
      });

      it('param "query"', () => {
        mockRoutingState({
          params: { query: 'testQuery' },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          jasmine.any(Object)
        );
      });

      it('query param "query"', () => {
        mockRoutingState({
          queryParams: { query: 'testQuery' },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          jasmine.any(Object)
        );
      });

      it('param "query" and query param "query"', () => {
        mockRoutingState({
          params: { query: 'testQuery1' },
          queryParams: { query: 'testQuery2' },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery2',
          jasmine.any(Object)
        );
      });

      it('query param "currentPage"', () => {
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { currentPage: 123 },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          jasmine.objectContaining({ currentPage: 123 })
        );
      });

      it('query param "pageSize"', () => {
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { pageSize: 20 },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          jasmine.objectContaining({ pageSize: 20 })
        );
      });

      it('query param "sortCode"', () => {
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { sortCode: 'name-asc' },
        });
        service.model$.subscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          jasmine.objectContaining({ sortCode: 'name-asc' })
        );
      });

      it('do 2 different queries, the lastScrollCriteria should be reset', () => {
        mockRoutingState({
          params: { query: 'testQuery1' },
        });
        service.model$.subscribe();

        mockRoutingState({
          params: { query: 'testQuery2' },
        });
        service.model$.subscribe();

        expect(service.latestScrollCriteria).toBeUndefined();
      });

      it('getPageItems for infinit scrolling, the lastScrollCriteria should be kept', () => {
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { currentPage: 0 },
        });
        service.model$.subscribe();

        service.getPageItems(1);
        service.model$.subscribe();

        expect(service.latestScrollCriteria).toEqual({
          query: 'testQuery',
          currentPage: 1,
          pageSize: 10,
          sortCode: undefined,
        });
      });
    });
  });
});
