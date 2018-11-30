import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { Address } from '../../../occ-models';
import { UserState, USER_FEATURE } from '../user-state';

const mockUserAddresses: Address[] = [{ id: 'address1' }, { id: 'address2' }];

describe('User Addresses Selectors', () => {
  let store: Store<UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAddresses', () => {
    it('should return a user addresses', () => {
      let result;
      store
        .pipe(select(fromSelectors.getAddresses))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadUserAddressesSuccess(mockUserAddresses)
      );

      expect(result).toEqual(mockUserAddresses);
    });
  });

  describe('getAddressLoading', () => {
    it('should return isLoading flag', () => {
      let result;
      store
        .pipe(select(fromSelectors.getAddressesLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadUserAddresses('userId'));

      expect(result).toEqual(true);
    });
  });
});
