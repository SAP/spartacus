import { TestBed, inject } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import createSpy = jasmine.createSpy;

const storeMock = { dispatch: createSpy(), pipe() {} };

describe('RoutingService', () => {

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
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        new fromStore.Go({ path: ['/search', 'query'] })
      );
    }
  ));
});
