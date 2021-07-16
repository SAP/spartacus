import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConsignmentTracking } from '../../../model/index';
import * as fromReducers from '../reducers';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Consignment Tracking Selectors', () => {
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
  describe('getConsignmentTracking', () => {
    it('should return the consignment tracking state from the store', () => {
      let result: ConsignmentTracking;
      store
        .pipe(select(UsersSelectors.getConsignmentTracking))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });
});
