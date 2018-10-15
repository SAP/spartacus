import { TestBed, inject } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import * as fromStore from '../store';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import * as NgrxStore from '@ngrx/store';

describe('RoutingService', () => {
  const mockSelect = createSpy().and.returnValue(() => of('redirect_url'));
  let store;

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

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

  it('should dispatch clear redirect action', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.clearRedirectUrl();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.ClearRedirectUrl()
      );
    }
  ));

  it('should expose redirectUrl state', inject(
    [RoutingService],
    (service: RoutingService) => {
      service.redirectUrl$.subscribe(url => {
        expect(mockSelect).toHaveBeenCalledWith(fromStore.getRedirectUrl);
        expect(url).toEqual('redirect_url');
      });
    }
  ));
});
