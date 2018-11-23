import { TestBed } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import * as fromStore from '../store';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import * as NgrxStore from '@ngrx/store';
import { PathPipeService } from '../configurable-routes';
import { NavigationExtras } from '@angular/router';

describe('RoutingService', () => {
  const mockRedirectUrl = createSpy().and.returnValue(() => of('redirect_url'));
  const mockRouterState = createSpy().and.returnValue(() => of({}));
  const mockPathPipeService = { transform: () => {} };
  let store;
  let service: RoutingService;
  let pathPipeService: PathPipeService;

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValues(
      mockRouterState,
      mockRedirectUrl
    );

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        RoutingService,
        { provide: PathPipeService, useValue: mockPathPipeService }
      ]
    });

    store = TestBed.get(Store);
    service = TestBed.get(RoutingService);
    pathPipeService = TestBed.get(PathPipeService);
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

  describe('goToPage', () => {
    it('should call go method with result of PathPipeService.transform', () => {
      const pageNames = ['testPageName', 'testChildPageName'];
      const parametersObjects = [
        { param1: 'value1' },
        { childParam2: 'chuildValue2' }
      ];
      const queryParams = { queryParam3: 'queryParamValue3' };
      const extras: NavigationExtras = { fragment: 'testFragment' };
      const transformedPath = ['transformed-path'];

      spyOn(pathPipeService, 'transform').and.returnValue(transformedPath);
      spyOn(service, 'go');
      service.goToPage(pageNames, parametersObjects, queryParams, extras);
      expect(pathPipeService.transform).toHaveBeenCalledWith(
        pageNames,
        parametersObjects
      );
      expect(service.go).toHaveBeenCalledWith(
        transformedPath,
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
