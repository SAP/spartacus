import { TestBed } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import * as fromStore from '../store';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import * as NgrxStore from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { UrlTranslatorService } from '../configurable-routes/url-translator/url-translator.service';

describe('RoutingService', () => {
  const mockRedirectUrl = createSpy().and.returnValue(() => of('redirect_url'));
  const mockRouterState = createSpy().and.returnValue(() => of({}));
  const mockUrlTranslatorService = { translate: () => {} };
  let store;
  let service: RoutingService;
  let urlTranslator: UrlTranslatorService;

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValues(
      mockRouterState,
      mockRedirectUrl
    );

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        RoutingService,
        { provide: UrlTranslatorService, useValue: mockUrlTranslatorService }
      ]
    });

    store = TestBed.get(Store);
    service = TestBed.get(RoutingService);
    urlTranslator = TestBed.get(UrlTranslatorService);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('go', () => {
    it('should dispatch navigation action', () => {
      service.go(['/search', 'query']);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({
          path: ['/search', 'query'],
          query: undefined,
          extras: undefined
        })
      );
    });
  });

  describe('translateAndGo', () => {
    it('should call "go" method with translated url', () => {
      const translateUrlOptions = {
        route: [
          'routeName',
          { name: 'childRouteName', params: { childParam: 'childParamValue' } }
        ]
      };
      const queryParams = { queryParam3: 'queryParamValue3' };
      const extras: NavigationExtras = { fragment: 'testFragment' };
      const translatedPath = ['translated-path'];

      spyOn(urlTranslator, 'translate').and.returnValue(translatedPath);
      spyOn(service, 'go');
      service.translateAndGo(translateUrlOptions, queryParams, extras);
      expect(urlTranslator.translate).toHaveBeenCalledWith(translateUrlOptions);
      expect(service.go).toHaveBeenCalledWith(
        translatedPath,
        queryParams,
        extras
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
      service.back();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({
          path: ['/'],
          query: undefined,
          extras: undefined
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

  it('should expose the whole router state', () => {
    service.redirectUrl$.subscribe(url => {
      expect(mockRedirectUrl).toHaveBeenCalledWith(fromStore.getRedirectUrl);
      expect(url).toEqual('redirect_url');
    });
  });

  it('should expose redirectUrl state', () => {
    service.routerState$.subscribe(state => {
      expect(mockRouterState).toHaveBeenCalledWith(fromStore.getRouterState);
      expect(state).toEqual({});
    });
  });
});
