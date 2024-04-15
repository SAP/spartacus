import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BundleService } from '@spartacus/cart/bundle/core';
import {
  ActivatedRouterStateSnapshot,
  CurrencyService,
  LanguageService,
  PageContext,
  PageType,
  Product,
  ProductSearchPage,
  provideDefaultConfig,
  RoutingService,
  SearchConfig,
} from '@spartacus/core';
import {
  defaultViewConfig,
  SearchCriteria,
  ViewConfig,
} from '@spartacus/storefront';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { BundleProductListComponentService } from './bundle-product-list.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockBundleService {
  getAvailableEntriesEntities = jasmine
    .createSpy('getAvailableEntriesEntities')
    .and.returnValue(new BehaviorSubject({ products: mockAllowedProducts }));
  getAllowedProducts = jasmine.createSpy('getAllowedProducts');
}

class MockRoutingService {
  getRouterState = jasmine
    .createSpy('getRouterState')
    .and.returnValue(mockRoutingState$);
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

const bundlePageContext: PageContext = createPageContext(
  'bundleSearch',
  PageType.CONTENT_PAGE
);

const defaultEntryGroupNumber = 2;

const defaultParams: Params = {
  entryGroupNumber: defaultEntryGroupNumber,
};

const mockDefaultRouterState: ActivatedRouterStateSnapshot = {
  url: '/entrygroups',
  params: defaultParams,
  queryParams: {},
  context: bundlePageContext,
} as ActivatedRouterStateSnapshot;

const mockRoutingState$ = new BehaviorSubject({
  state: mockDefaultRouterState,
});

const mockAllowedProducts: Product[] = mockProducts(3);

function createPageContext(id: string, type: PageType): PageContext {
  return {
    id,
    type,
  };
}

function mockRoutingState(state: ActivatedRouterStateSnapshot): void {
  mockRoutingState$.next({ state });
}

function mockProduct(
  code: string,
  name: string,
  description: string = ''
): Product {
  return {
    code,
    name,
    description,
  };
}

function mockProducts(count: number): Product[] {
  let products = [];
  for (let i = 0; i < count; i++) {
    products.push(mockProduct(i.toString(), `product-${i}`));
  }
  return products;
}

describe('BundleProductListComponentService', () => {
  let service: BundleProductListComponentService;
  let activatedRoute: ActivatedRoute;
  let bundleService: BundleService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BundleProductListComponentService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: 'ActivatedRoute' },
        { provide: BundleService, useClass: MockBundleService },
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: LanguageService, useClass: MockLanguageService },
        provideDefaultConfig(<ViewConfig>defaultViewConfig),
      ],
    });

    service = TestBed.inject(BundleProductListComponentService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bundleService = TestBed.inject(BundleService);

    mockRoutingState(mockDefaultRouterState);

  });

  describe('availableEntities$', () => {
    it('should return bundle available entities', fakeAsync(() => {
      let result: ProductSearchPage = {};
      const subscription: Subscription = service.availableEntities$.subscribe(
        (res) => (result = res)
      );

      tick();

      subscription.unsubscribe();

      expect(result).toEqual({ products: mockAllowedProducts });
      expect(result).not.toBeNull();
    }));

    it('should trigger search when routing changed', fakeAsync(() => {
      const subscription: Subscription = service.availableEntities$.subscribe();

      tick();

      subscription.unsubscribe();

      expect(bundleService.getAllowedProducts).toHaveBeenCalled();
    }));

    it('should search bundle allowed products with search criteria from routing', fakeAsync(() => {
      const criteria: SearchCriteria = {
        sortCode: 'name:asc',
        pageSize: 15,
        currentPage: 0,
      };

      const searchConfig: SearchConfig = {
        pageSize: criteria.pageSize,
        currentPage: criteria.currentPage,
        sort: criteria.sortCode,
      };

      const testQuery = 'testQuery';

      const newRoutingState: ActivatedRouterStateSnapshot = {
        ...mockDefaultRouterState,
        queryParams: criteria,
        params: {
          ...defaultParams,
          query: testQuery,
        }
      };

      mockRoutingState(newRoutingState);

      const subscription: Subscription = service.availableEntities$.subscribe();

      tick();

      subscription.unsubscribe();

      expect(bundleService.getAllowedProducts).toHaveBeenCalledWith(
        defaultEntryGroupNumber,
        testQuery,
        searchConfig
      );
    }));

    it('should not trigger search when not in bundle alowed produt page', fakeAsync(() => {
      mockRoutingState({
        ...mockDefaultRouterState,
        context: {
          id: 'producPage',
        },
      });

      const subscription: Subscription = service.availableEntities$.subscribe();

      tick();

      subscription.unsubscribe();

      expect(bundleService.getAllowedProducts).not.toHaveBeenCalled();
    }));

    it('should not trigger search when routing without entryGroupNumber', fakeAsync(() => {
      mockRoutingState({
        ...mockDefaultRouterState,
        params: {},
      });

      const subscription: Subscription = service.availableEntities$.subscribe();

      tick();

      subscription.unsubscribe();

      expect(bundleService.getAllowedProducts).not.toHaveBeenCalled();
    }));
  });

  describe('checkProductDetail', () => {
    it('should add route param with selected product code', () => {
      const mockedProduct = mockProduct('testCode', 'testProduct');
      service.checkDetails(mockedProduct);

      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: activatedRoute,
        queryParams: { productCode: mockedProduct.code },
        queryParamsHandling: 'merge',
      });
    });
  });
});
