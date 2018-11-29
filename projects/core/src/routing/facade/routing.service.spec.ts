import { TestBed, inject } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import * as fromStore from '../store';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import * as NgrxStore from '@ngrx/store';

describe('RoutingService', () => {
  const mockRedirectUrl = createSpy().and.returnValue(() => of('redirect_url'));
  const mockRouterState = createSpy().and.returnValue(() => of({}));
  let store;

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValues(
      mockRouterState,
      mockRedirectUrl
    );

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [RoutingService]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', inject(
    [RoutingService],
    (service: RoutingService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should dispatch navigation action', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.go(['/search', 'query']);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({
          path: ['/search', 'query'],
          query: undefined,
          extras: undefined
        })
      );
    }
  ));

  it('should dispatch back action', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.back();
      expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Back());
    }
  ));

  it('should go to homepage on back action when referer is not from the app', inject(
    [RoutingService],
    (service: RoutingService) => {
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
    }
  ));

  it('should dispatch forward action', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.forward();
      expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Forward());
    }
  ));

  it('should dispatch clear redirect url action', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.clearRedirectUrl();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.ClearRedirectUrl()
      );
    }
  ));

  it('should dispatch save redirect url action', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.saveRedirectUrl('testUrl');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SaveRedirectUrl('testUrl')
      );
    }
  ));

  it('should expose the whole router state', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.redirectUrl$.subscribe(url => {
        expect(mockRedirectUrl).toHaveBeenCalledWith(fromStore.getRedirectUrl);
        expect(url).toEqual('redirect_url');
      });
    }
  ));

  it('should expose redirectUrl state', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.routerState$.subscribe(state => {
        expect(mockRouterState).toHaveBeenCalledWith(fromStore.getRouterState);
        expect(state).toEqual({});
      });
    }
  ));
});
