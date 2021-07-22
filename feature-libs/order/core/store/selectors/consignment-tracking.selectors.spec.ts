import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConsignmentTracking } from '@spartacus/order/root';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromReducers from '../reducers';
import { OrderSelectors } from './index';

describe('Consignment Tracking Selectors', () => {
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
  describe('getConsignmentTracking', () => {
    it('should return the consignment tracking state from the store', () => {
      let result: ConsignmentTracking;
      store
        .pipe(select(OrderSelectors.getConsignmentTracking))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });
});
