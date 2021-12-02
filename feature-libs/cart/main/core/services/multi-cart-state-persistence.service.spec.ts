import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  BASE_SITE_CONTEXT_ID,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActiveCartBrowserStorageChangeEvent } from '../../root/events/cart.events';
import { CartActions, MULTI_CART_FEATURE, StateWithMultiCart } from '../store';
import * as fromCartReducers from '../store/reducers/index';
import { MultiCartStatePersistenceService } from './multi-cart-state-persistence.service';

class MockSiteContextParamsService {
  getValues(): Observable<Array<string>> {
    return of(['context']);
  }
}
class MockEventService implements Partial<EventService> {
  dispatch(): void {}
}

const mockCartState = { active: 'cartId' };

describe('MultiCartStatePersistenceService', () => {
  let service: MultiCartStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let siteContextParamsService: SiteContextParamsService;
  let store: Store<StateWithMultiCart>;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromCartReducers.getMultiCartReducers()
        ),
      ],
      providers: [
        MultiCartStatePersistenceService,
        {
          provide: SiteContextParamsService,
          useClass: MockSiteContextParamsService,
        },
        StatePersistenceService,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    service = TestBed.inject(MultiCartStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    siteContextParamsService = TestBed.inject(SiteContextParamsService);
    store = TestBed.inject(Store);
    eventService = TestBed.inject(EventService);
    spyOn(store, 'dispatch').and.stub();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be cleared on base site change', () => {
    service['onRead'](null);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.ClearCartState()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.SetActiveCartId('')
    );
  });

  it('active cart should be dispatched in an event on context change', () => {
    spyOn<any>(
      service,
      'dispatchActiveCartBrowserStorageChangeEvent'
    ).and.stub();
    service['onRead'](mockCartState);
    expect(
      service['dispatchActiveCartBrowserStorageChangeEvent']
    ).toHaveBeenCalledWith(mockCartState);
  });

  it('active cart should be dispatched in an event on state persist', () => {
    spyOn<any>(
      service,
      'dispatchActiveCartBrowserStorageChangeEvent'
    ).and.stub();
    service['onPersist'](mockCartState);
    expect(
      service['dispatchActiveCartBrowserStorageChangeEvent']
    ).toHaveBeenCalledWith(mockCartState);
  });

  it('dispatchActiveCartBrowserStorageChangeEvent should do exactly that', () => {
    spyOn(eventService, 'dispatch');
    service['dispatchActiveCartBrowserStorageChangeEvent'](mockCartState);
    expect(eventService.dispatch).toHaveBeenCalledWith(
      jasmine.any(ActiveCartBrowserStorageChangeEvent)
    );
    expect(eventService.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        state: mockCartState,
      })
    );
  });

  it('should call persistenceService with correct attributes', () => {
    const state$ = of('');
    const context$ = of(['']);
    spyOn(siteContextParamsService, 'getValues').and.returnValue(context$);
    spyOn(service as any, 'getCartState').and.returnValue(state$);

    service.initSync();
    expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
      jasmine.objectContaining({
        key: 'cart',
        context$,
        state$,
      })
    );
    expect(service['getCartState']).toHaveBeenCalled();
    expect(siteContextParamsService.getValues).toHaveBeenCalledWith([
      BASE_SITE_CONTEXT_ID,
    ]);
  });

  it('should return active from cart state', (done) => {
    service['getCartState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({ active: '' });
        done();
      });
  });
});
