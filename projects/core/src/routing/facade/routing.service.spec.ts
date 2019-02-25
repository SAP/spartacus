import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { of } from 'rxjs';

import createSpy = jasmine.createSpy;

import * as fromStore from '../store';
import { PageType } from '../../occ';
import { PageContext } from '../models/page-context.model';
import { UrlTranslationService } from '../configurable-routes/url-translation/url-translation.service';
import { RouterState } from '../store/reducers/router.reducer';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  let store: Store<RouterState>;
  let service: RoutingService;
  let urlTranslator: UrlTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        RoutingService,
        { provide: UrlTranslationService, useValue: { translate: () => {} } }
      ]
    });

    store = TestBed.get(Store);
    service = TestBed.get(RoutingService);
    urlTranslator = TestBed.get(UrlTranslationService);
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

  it('shoud return only page context from the state', () => {
    const pageContext: PageContext = {
      id: 'homepage',
      type: PageType.CATALOG_PAGE
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
});
