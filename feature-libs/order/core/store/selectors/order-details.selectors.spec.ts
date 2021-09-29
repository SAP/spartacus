import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Order } from '@spartacus/core';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromReducers from '../reducers';
import { OrderSelectors } from './index';

describe('Order Details Selectors', () => {
  let store: Store<StateWithOrder>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ORDER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('getOrderDetails', () => {
    it('should return the Order state from the store', () => {
      let result: Order;
      store
        .pipe(select(OrderSelectors.getOrderDetails))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });
});
