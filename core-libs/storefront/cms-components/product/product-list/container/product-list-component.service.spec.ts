import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActivatedRouterStateSnapshot,
  CurrencyService,
  LanguageService,
  ProductSearchPage,
  ProductSearchService,
  provideDefaultConfig,
  RoutingService,
} from '@spartacus/core';
import { defaultViewConfig, ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, firstValueFrom, of, Subscription } from 'rxjs';
import { ProductListComponentService } from './product-list-component.service';
import { vi } from 'vitest';

class MockRouter {
  navigate = vi.fn();
}

class MockProductSearchService {
  getResults = vi.fn().mockReturnValue(new BehaviorSubject({ products: [] }));
  search = vi.fn();
  clearResults = vi.fn();
}

class MockRoutingService {
  getRouterState = vi.fn().mockReturnValue(mockRoutingState$);
}

const mockDefaultRouterState = {
  url: '/',
  params: {},
  queryParams: {},
} as ActivatedRouterStateSnapshot;

const mockRoutingState$ = new BehaviorSubject({
  state: mockDefaultRouterState,
});

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

  function mockRoutingState(state: {
    url?: string;
    params?: object;
    queryParams?: object;
  }) {
    mockRoutingState$.next({
      state: {
        url: state.url || '/',
        params: state.params || {},
        queryParams: state.queryParams || {},
      } as ActivatedRouterStateSnapshot,
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductListComponentService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: 'ActivatedRoute' },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: LanguageService, useClass: MockLanguageService },
        provideDefaultConfig(<ViewConfig>defaultViewConfig),
      ],
    });

    service = TestBed.inject(ProductListComponentService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productSearchService = TestBed.inject(ProductSearchService);
  });

  it('sort should set query param "sortCode" in the url', () => {
    service.sort('testSortCode');
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { sortCode: 'testSortCode' },
      queryParamsHandling: 'merge',
      relativeTo: activatedRoute,
    });
  });

  it('should emit new route state when url changes', async () => {
    vi.useFakeTimers();
    const mockNewActivatedRouteState = {
      ...mockDefaultRouterState,
      url: '/newRoute',
    };

    let activatedRouteState: ActivatedRouterStateSnapshot;
    const subscription: Subscription = service['searchByRouting$'].subscribe(
      (res) => (activatedRouteState = res)
    );

    await vi.advanceTimersByTimeAsync(0);
    expect(activatedRouteState).toEqual(mockDefaultRouterState);

    mockRoutingState(mockNewActivatedRouteState);

    await vi.advanceTimersByTimeAsync(0);
    vi.useRealTimers();
    expect(activatedRouteState).toEqual(mockNewActivatedRouteState);

    subscription.unsubscribe();
  });

  describe('model$', () => {
    it('should return search results', async () => {
      vi.useFakeTimers();
      let result: ProductSearchPage;
      service.model$.subscribe((r) => (result = r));
      await vi.advanceTimersByTimeAsync(0);
      vi.useRealTimers();
      expect(result).toEqual({ products: [] });
    });

    describe('should perform search on change of routing', () => {
      it('with default "pageSize" 12', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { pageSize: 12 },
        });

        const subscription: Subscription = service.model$.subscribe();
        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();
        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(undefined, {
          pageSize: 12,
        });
      });

      it('param "categoryCode"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { categoryCode: 'testCategory' },
        });

        const subscription: Subscription = service.model$.subscribe();
        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();
        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          ':relevance:allCategories:testCategory',
          expect.any(Object)
        );
      });

      it('param "brandCode"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { brandCode: 'testBrand' },
        });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          ':relevance:allCategories:testBrand',
          expect.any(Object)
        );
      });

      it('param "query"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
        });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          expect.any(Object)
        );
      });

      it('query param "query"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          queryParams: { query: 'testQuery' },
        });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          expect.any(Object)
        );
      });

      it('param "query" and query param "query"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery1' },
          queryParams: { query: 'testQuery2' },
        });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery2',
          expect.any(Object)
        );
      });

      it('query param "currentPage"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { currentPage: 123 },
        });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          expect.objectContaining({ currentPage: 123 })
        );
      });

      it('query param "pageSize"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { pageSize: 20 },
        });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          expect.objectContaining({ pageSize: 20 })
        );
      });

      it('query param "sortCode"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { sortCode: 'name-asc' },
        });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).toHaveBeenCalledWith(
          'testQuery',
          expect.objectContaining({ sort: 'name-asc' })
        );
      });
    });

    describe('should perform search ONLY if product data does not already exist (state transfered by SSR)', () => {
      it('by default', async () => {
        vi.useFakeTimers();
        mockRoutingState({});
        productSearchService.getResults = () =>
          of({
            pagination: {
              pageSize: 12,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('param "categoryCode"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { categoryCode: 'testCategory' },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'relevance:allCategories:testCategory' },
            },
            pagination: {
              pageSize: 12,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('param "brandCode"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { brandCode: 'testBrand' },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'relevance:allCategories:testBrand' },
            },
            pagination: {
              pageSize: 12,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('param "query"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'testQuery' },
            },
            pagination: {
              pageSize: 12,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('query param "query"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          queryParams: { query: 'testQuery' },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'testQuery' },
            },
            pagination: {
              pageSize: 12,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('param "query" and query param "query"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery1' },
          queryParams: { query: 'testQuery2' },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'testQuery2' },
            },
            pagination: {
              pageSize: 12,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('query param "currentPage"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { currentPage: 123 },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'testQuery' },
            },
            pagination: {
              pageSize: 12,
              currentPage: 123,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('query param "pageSize"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { pageSize: 20 },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'testQuery' },
            },
            pagination: {
              pageSize: 20,
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });

      it('query param "sortCode"', async () => {
        vi.useFakeTimers();
        mockRoutingState({
          params: { query: 'testQuery' },
          queryParams: { sortCode: 'name-asc' },
        });
        productSearchService.getResults = () =>
          of({
            currentQuery: {
              query: { value: 'testQuery' },
            },
            pagination: {
              pageSize: 12,
              sort: 'name-asc',
            },
          });

        const subscription: Subscription = service.model$.subscribe();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        subscription.unsubscribe();

        expect(productSearchService.search).not.toHaveBeenCalled();
      });
    });
  });
});
