import { TestBed, inject } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import * as fromStore from '../store';
import { Store } from '@ngrx/store';

const storeMock = { dispatch() {} };

describe('RoutingService', () => {
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: storeMock
        },
        RoutingService
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
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
      service.go('/search', 'query');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({ path: ['/search', 'query'] })
      );
    }
  ));
});
