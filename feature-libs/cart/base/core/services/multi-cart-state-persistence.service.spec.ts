import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, of, firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartActions, MULTI_CART_FEATURE, StateWithMultiCart } from '../store';
import * as fromCartReducers from '../store/reducers/index';
import { MultiCartStatePersistenceService } from './multi-cart-state-persistence.service';

class MockSiteContextParamsService {
  getValues(): Observable<Array<string>> {
    return of(['context']);
  }
}

describe('MultiCartStatePersistenceService', () => {
  let service: MultiCartStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let siteContextParamsService: SiteContextParamsService;
  let store: Store<StateWithMultiCart>;

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
      ],
    });

    service = TestBed.inject(MultiCartStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    siteContextParamsService = TestBed.inject(SiteContextParamsService);
    store = TestBed.inject(Store);
    vi.spyOn(store, 'dispatch').mockImplementation(() => {});
    vi.spyOn(persistenceService, 'syncWithStorage').mockImplementation(() => {});
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

  it('active cart should be updated on context change', () => {
    service['onRead']({ active: 'cartId' });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.ClearCartState()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.SetActiveCartId('cartId')
    );
  });

  it('should call persistenceService with correct attributes', () => {
    const state$ = of('');
    const context$ = of(['']);
    vi.spyOn(siteContextParamsService, 'getValues').mockReturnValue(context$);
    vi.spyOn(service as any, 'getCartState').mockReturnValue(state$);

    service.initSync();
    expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
      expect.objectContaining({
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

  it('should return active from cart state', async () => {
    const state = await firstValueFrom(service['getCartState']());
    expect(state).toEqual({ active: '' });
  });
});
