import { TestBed } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import * as fromStore from '../store';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import * as NgrxStore from '@ngrx/store';
import { UrlTranslatorService } from '../configurable-routes/url-translator/url-translator.service';

describe('RoutingService', () => {
  let store;
  let service: RoutingService;
  let urlTranslator: UrlTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        RoutingService,
        { provide: UrlTranslatorService, useValue: { translate: () => {} } }
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
    it('should dispatch navigation action with non-translated path when first argument is an array', () => {
      spyOn(urlTranslator, 'translate');
      service.go(['/search', 'query']);
      expect(urlTranslator.translate).not.toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({
          path: ['/search', 'query'],
          query: undefined,
          extras: undefined
        })
      );
    });

    it('should dispatch navigation action with translated path when first argument is an object', () => {
      spyOn(urlTranslator, 'translate').and.returnValue([
        '',
        'translated',
        'path'
      ]);
      service.go({ route: ['testRoute'] });
      expect(urlTranslator.translate).toHaveBeenCalledWith({
        route: ['testRoute']
      });
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({
          path: ['', 'translated', 'path'],
          query: undefined,
          extras: undefined
        })
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

  it('should expose the redirectUrl', () => {
    const mockRedirectUrl = createSpy().and.returnValue(() =>
      of('redirect_url')
    );
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRedirectUrl);

    let redirectUrl;
    service.getRedirectUrl().subscribe(url => (redirectUrl = url));
    expect(redirectUrl).toEqual('redirect_url');
  });

  it('should expose whole router state', () => {
    const mockRouterState = createSpy().and.returnValue(() => of({}));
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockRouterState);

    let routerState;
    service.getRouterState().subscribe(state => (routerState = state));
    expect(mockRouterState).toHaveBeenCalledWith(fromStore.getRouterState);
    expect(routerState).toEqual({});
  });
});
