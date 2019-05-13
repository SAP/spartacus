import { TestBed } from '@angular/core/testing';

import * as NgrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';

import { of } from 'rxjs';

import * as fromStore from '../store';
import { PageContext } from '../models/page-context.model';
import { UrlService } from '../configurable-routes/url-translation/url.service';
import { RouterState } from '../store/reducers/router.reducer';

import { RoutingService } from './routing.service';
import createSpy = jasmine.createSpy;
import { PageType } from '../../model/cms.model';

describe('RoutingService', () => {
  let store: Store<RouterState>;
  let service: RoutingService;
  let urlService: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        RoutingService,
        { provide: UrlService, useValue: { generateUrl: () => {} } },
      ],
    });

    store = TestBed.get(Store);
    service = TestBed.get(RoutingService);
    urlService = TestBed.get(UrlService);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('go', () => {
    it('should dispatch navigation action with generated path', () => {
      spyOn(urlService, 'generateUrl').and.returnValue(['generated', 'path']);
      service.go([]);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({
          path: ['generated', 'path'],
          query: undefined,
          extras: undefined,
        })
      );
    });

    it('should call url service service with given array of commands', () => {
      spyOn(urlService, 'generateUrl');
      const commands = ['testString', { cxRoute: 'testRoute' }];
      service.go(commands);
      expect(urlService.generateUrl).toHaveBeenCalledWith(commands);
    });
  });

  describe('goByUrl', () => {
    it('should dispatch GoByUrl action', () => {
      service.goByUrl('test');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.GoByUrl('test')
      );
    });
  });

  describe('back', () => {
    it('should dispatch back action', () => {
      service.back();
      expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Back());
    });

    it('should go to homepage on back action when referer is not from the app', () => {
      spyOnProperty(document, 'referrer', 'get').and.returnValue(
        'http://foobar.com'
      );
      spyOn(urlService, 'generateUrl').and.callFake(x => x);
      service.back();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({
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
      expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Forward());
    });
  });

  describe('clearRedirectUrl', () => {
    it('should dispatch clear redirect url action', () => {
      service.clearRedirectUrl();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.ClearRedirectUrl()
      );
    });
  });

  describe('saveRedirectUrl', () => {
    it('should dispatch save redirect url action', () => {
      service.saveRedirectUrl('testUrl');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SaveRedirectUrl('testUrl')
      );
    });
  });

  it('should expose the redirectUrl', () => {
    const mockRedirectUrl = createSpy().and.returnValue(() =>
      of('redirect_url')
    );
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRedirectUrl);

    let redirectUrl: string;
    service.getRedirectUrl().subscribe(url => (redirectUrl = url));
    expect(redirectUrl).toEqual('redirect_url');
  });

  it('should expose whole router state', () => {
    const mockRouterState = createSpy().and.returnValue(() => of({}));
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRouterState);

    let routerState: any;
    service.getRouterState().subscribe(state => (routerState = state));
    expect(mockRouterState).toHaveBeenCalledWith(fromStore.getRouterState);
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
      .subscribe(value => (result = value))
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
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual(pageContext);
    expect(NgrxStore.select).toHaveBeenCalledWith(fromStore.getNextPageContext);
  });

  it('isNavigating should return isNavigating state', () => {
    const isNavigating = true;
    const mockRouterState = createSpy().and.returnValue(() => of(isNavigating));
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRouterState);

    let result: boolean;
    service
      .isNavigating()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual(isNavigating);
    expect(NgrxStore.select).toHaveBeenCalledWith(fromStore.isNavigating);
  });
});
