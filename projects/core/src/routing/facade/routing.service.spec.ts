import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as NgrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PageType } from '../../model/cms.model';
import { UrlCommands } from '../configurable-routes';
import { SemanticPathService } from '../configurable-routes/url-translation/semantic-path.service';
import { PageContext } from '../models/page-context.model';
import { RoutingActions } from '../store/actions/index';
import { RouterState } from '../store/routing-state';
import { RoutingSelector } from '../store/selectors/index';
import { RoutingParamsService } from './routing-params.service';
import { RoutingService } from './routing.service';
import createSpy = jasmine.createSpy;

class MockSemanticPathService {
  transform(_commands: UrlCommands): any[] {
    return [];
  }
  get(_routeName: string): string {
    return '';
  }
}
class MockRoutingParamsService {
  getParams(): Observable<{ [key: string]: string }> {
    return of();
  }
}

describe('RoutingService', () => {
  let store: Store<RouterState>;
  let service: RoutingService;
  let winRef: WindowRef;
  let urlService: SemanticPathService;
  let routingParamsService: RoutingParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        RoutingService,
        WindowRef,
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: RoutingParamsService, useClass: MockRoutingParamsService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(RoutingService);
    winRef = TestBed.inject(WindowRef);
    urlService = TestBed.inject(SemanticPathService);
    routingParamsService = TestBed.inject(RoutingParamsService);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('go', () => {
    it('should dispatch navigation action with generated path', () => {
      spyOn(urlService, 'transform').and.returnValue(['generated', 'path']);
      service.go([]);
      expect(store.dispatch).toHaveBeenCalledWith(
        new RoutingActions.RouteGoAction({
          path: ['generated', 'path'],
          query: undefined,
          extras: undefined,
        })
      );
    });

    it('should call url service service with given array of commands', () => {
      spyOn(urlService, 'transform');
      const commands = ['testString', { cxRoute: 'testRoute' }];
      service.go(commands);
      expect(urlService.transform).toHaveBeenCalledWith(commands);
    });
  });

  describe('goByUrl', () => {
    it('should dispatch GoByUrl action', () => {
      service.goByUrl('test');
      expect(store.dispatch).toHaveBeenCalledWith(
        new RoutingActions.RouteGoByUrlAction('test')
      );
    });
  });

  describe('getUrl', () => {
    it('should resolve the relative url from the urlCommands', () => {
      spyOn(urlService, 'transform').and.returnValue(['product', '123']);
      const url = service.getUrl({
        cxRoute: 'product',
        params: { code: '123' },
      });
      expect(url).toEqual('/product/123');
    });

    it('should resolve the relative url from the urlCommands and NavigationExtras', () => {
      spyOn(urlService, 'transform').and.returnValue([
        'category',
        'SLR_CAMERAS',
      ]);

      const queryParams = { sortBy: 'price-desc' };
      const url = service.getUrl(
        { cxRoute: 'category', params: { code: 'SLR_CAMERAS' } },
        { queryParams }
      );
      expect(url).toEqual('/category/SLR_CAMERAS?sortBy=price-desc');
    });
  });

  describe('getFullUrl', () => {
    it('should resolve the absolute url from the urlCommands', () => {
      spyOn(urlService, 'transform').and.returnValue(['product', '123']);
      const url = service.getFullUrl({
        cxRoute: 'product',
        params: { code: '123' },
      });
      expect(url).toEqual(`${winRef.document.location.origin}/product/123`);
    });
  });

  describe('back', () => {
    it('should dispatch back action', () => {
      service.back();
      expect(store.dispatch).toHaveBeenCalledWith(
        new RoutingActions.RouteBackAction()
      );
    });

    it('should go to homepage on back action when referer is not from the app', () => {
      spyOnProperty(document, 'referrer', 'get').and.returnValue(
        'http://foobar.com'
      );
      spyOn(urlService, 'transform').and.callFake((x) => x);
      service.back();
      expect(store.dispatch).toHaveBeenCalledWith(
        new RoutingActions.RouteGoAction({
          path: ['/'],
          query: undefined,
          extras: undefined,
        })
      );
    });
  });

  describe('forward', () => {
    it('should dispatch forward action', () => {
      service.forward();
      expect(store.dispatch).toHaveBeenCalledWith(
        new RoutingActions.RouteForwardAction()
      );
    });
  });

  it('should expose whole router state', () => {
    const mockRouterState = createSpy().and.returnValue(() => of({}));
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRouterState);

    let routerState: any;
    service.getRouterState().subscribe((state) => (routerState = state));
    expect(mockRouterState).toHaveBeenCalledWith(
      RoutingSelector.getRouterState
    );
    expect(routerState).toEqual({});
  });

  it('should return only page context from the state', () => {
    const pageContext: PageContext = {
      id: 'homepage',
      type: PageType.CATALOG_PAGE,
    };
    const mockRouterState = createSpy().and.returnValue(() => of(pageContext));
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRouterState);

    let result: PageContext;
    service
      .getPageContext()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(pageContext);
  });

  it('getNextPageContext should return nextPageContext state', () => {
    const pageContext: PageContext = {
      id: 'homepage',
      type: PageType.CATALOG_PAGE,
    };
    const mockRouterState = createSpy().and.returnValue(() => of(pageContext));
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRouterState);

    let result: PageContext;
    service
      .getNextPageContext()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(pageContext);
    expect(NgrxStore.select as any).toHaveBeenCalledWith(
      RoutingSelector.getNextPageContext
    );
  });

  it('isNavigating should return isNavigating state', () => {
    const isNavigating = true;
    const mockRouterState = createSpy().and.returnValue(() => of(isNavigating));
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRouterState);

    let result: boolean;
    service
      .isNavigating()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(isNavigating);
    expect(NgrxStore.select as any).toHaveBeenCalledWith(
      RoutingSelector.isNavigating
    );
  });

  it('should delegate getParams() to RoutingParamsService', () => {
    const spy = spyOn(routingParamsService, 'getParams');
    service.getParams();
    expect(spy).toHaveBeenCalled();
  });

  describe('changeNextPageContext', () => {
    it('should dispatch ChangeNextPageContext action', () => {
      const context: PageContext = { id: 'test ' };
      service.changeNextPageContext(context);
      expect(store.dispatch).toHaveBeenCalledWith(
        new RoutingActions.ChangeNextPageContext(context)
      );
    });
  });
});
