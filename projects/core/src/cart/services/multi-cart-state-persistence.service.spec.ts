import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromCartReducers from '../../cart/store/reducers/index';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { SiteContextParamsService } from '../../site-context/services/site-context-params.service';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { CartActions, MULTI_CART_FEATURE, StateWithMultiCart } from '../store';
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
