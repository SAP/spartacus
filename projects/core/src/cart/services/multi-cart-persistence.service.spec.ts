import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromCartReducers from '../../cart/store/reducers/index';
import { PersistenceService } from '../../state/services/persistence.service';
import { CartActions, MULTI_CART_FEATURE, StateWithMultiCart } from '../store';
import { MultiCartPersistenceService } from './multi-cart-persistence.service';

const stateUpdate$ = new Subject<{ active: string }>();

class MockPersistentService {
  register(): Observable<{ active: string }> {
    return stateUpdate$.asObservable();
  }
}

describe('MultiCartPersistenceService', () => {
  let service: MultiCartPersistenceService;
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
        MultiCartPersistenceService,
        { provide: PersistenceService, useClass: MockPersistentService },
      ],
    });

    service = TestBed.inject(MultiCartPersistenceService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be cleared on base site change', () => {
    stateUpdate$.next(null);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(new CartActions.ClearCart());
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.ClearMultiCartState()
    );
  });

  it('active cart should be updated on context change', () => {
    stateUpdate$.next({ active: 'cartId' });
    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(new CartActions.ClearCart());
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.ClearMultiCartState()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.SetActiveCartId('cartId')
    );
  });
});
