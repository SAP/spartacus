import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouterStateSnapshot,
  PageContext,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CdsMerchandisingSearchContextService } from './cds-merchandising-search-context.service';
import { Params } from '@angular/router';
import { ProductListRouteParams } from './../model/merchandising-search.model';

class RoutingServiceStub {
  getRouterState(): Observable<RouterState> {
    return of();
  }
}

class TestProductListRouteParams implements ProductListRouteParams {
  query?: string;

  constructor(protected queryPhrase?: string) {
    this.query = queryPhrase;
  }
}

class TestActivatedRouterStateSnapshot implements ActivatedRouterStateSnapshot {
  url: string;
  queryParams: Params;
  params: Params;
  context: PageContext;
  cmsRequired: boolean;
  semanticRoute?: string | undefined;

  constructor(
    protected queryParamsQuery: string | undefined,
    protected productListRouteParams: ProductListRouteParams
  ) {
    this.queryParams = {
      query: queryParamsQuery,
    };
    this.params = productListRouteParams;
  }
}

class TestRouterState implements RouterState {
  nextState?: ActivatedRouterStateSnapshot | undefined;
  state: ActivatedRouterStateSnapshot;
  navigationId: number;

  constructor(
    protected activatedRouterStateSnapshot: TestActivatedRouterStateSnapshot
  ) {
    this.state = activatedRouterStateSnapshot;
  }
}

describe('CdsMerchandisingSearchContextService', () => {
  let cdsMerchandisingSearchContextService: CdsMerchandisingSearchContextService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: RoutingServiceStub,
        },
      ],
    });
    cdsMerchandisingSearchContextService = TestBed.inject(
      CdsMerchandisingSearchContextService
    );
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(cdsMerchandisingSearchContextService).toBeTruthy();
  });

  it('should return a search phrase when it is provided in query params', () => {
    const searchPhrase = 'camera';
    const productListRouteParams: ProductListRouteParams =
      new TestProductListRouteParams();
    const activatedRouterStateSnapshot = new TestActivatedRouterStateSnapshot(
      searchPhrase,
      productListRouteParams
    );
    const routerState = new TestRouterState(activatedRouterStateSnapshot);

    spyOn(routingService, 'getRouterState').and.returnValue(of(routerState));

    let searchContext: string;
    cdsMerchandisingSearchContextService
      .getSearchPhrase()
      .subscribe((result) => {
        searchContext = result;
      })
      .unsubscribe();
    expect(searchContext).toEqual(searchPhrase);
  });

  it('should return a search phrase when it is provided in route params', () => {
    const searchPhrase = 'camera';
    const productListRouteParams: ProductListRouteParams =
      new TestProductListRouteParams(searchPhrase);
    const activatedRouterStateSnapshot = new TestActivatedRouterStateSnapshot(
      undefined,
      productListRouteParams
    );
    const routerState = new TestRouterState(activatedRouterStateSnapshot);

    spyOn(routingService, 'getRouterState').and.returnValue(of(routerState));

    let searchContext: string;
    cdsMerchandisingSearchContextService
      .getSearchPhrase()
      .subscribe((result) => {
        searchContext = result;
      })
      .unsubscribe();
    expect(searchContext).toEqual(searchPhrase);
  });

  it('should return undefined when there is no search phrase provided', () => {
    const productListRouteParams: ProductListRouteParams =
      new TestProductListRouteParams();
    const activatedRouterStateSnapshot = new TestActivatedRouterStateSnapshot(
      undefined,
      productListRouteParams
    );
    const routerState = new TestRouterState(activatedRouterStateSnapshot);

    spyOn(routingService, 'getRouterState').and.returnValue(of(routerState));

    let searchContext: string;
    cdsMerchandisingSearchContextService
      .getSearchPhrase()
      .subscribe((result) => {
        searchContext = result;
      })
      .unsubscribe();
    expect(searchContext).toEqual(undefined);
  });
});
