import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReturnRequest } from '../../../model/order.model';
import * as fromReducers from '../reducers';
import { UsersSelectors } from './index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Order Return Request Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithUser>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrderReturnRequest', () => {
    it('should return the Order Return Request from the store', () => {
      let result: ReturnRequest;
      store
        .pipe(select(UsersSelectors.getOrderReturnRequest))
        .subscribe(value => (result = value));
      expect(result).not.toBeNull();
    });
  });
});
