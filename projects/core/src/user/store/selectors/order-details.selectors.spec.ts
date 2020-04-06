import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Order } from '../../../model/order.model';
import * as fromReducers from '../reducers';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Order Details Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('getOrderDetails', () => {
    it('should return the Order state from the store', () => {
      let result: Order;
      store
        .pipe(select(UsersSelectors.getOrderDetails))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });
});
