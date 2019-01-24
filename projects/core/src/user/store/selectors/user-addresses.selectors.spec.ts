import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import { StateWithUser, USER_FEATURE, UserAddressesState } from '../user-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';
import { Address } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';

const mockUserAddresses: Address[] = [{ id: 'address1' }, { id: 'address2' }];

describe('User Addresses Selectors', () => {
  let store: Store<StateWithUser>;

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

  describe('getAddressesLoaderState', () => {
    it('should return a user addresses loader state', () => {
      let result: LoaderState<UserAddressesState>;
      store
        .pipe(select(fromSelectors.getAddressesLoaderState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: {
          list: [],
          isActionProcessing: false
        }
      });
    });
  });

  describe('getAddresses', () => {
    it('should return a user addresses', () => {
      let result: Address[];
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
      let result: boolean;
      store
        .pipe(select(fromSelectors.getAddressesLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadUserAddresses('userId'));

      expect(result).toEqual(true);
    });
  });

  describe('getAddressProcessingStatus', () => {
    it('should return isActionProcessing flag', () => {
      let result: boolean;
      store
        .pipe(select(fromSelectors.getAddressActionProcessingStatus))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.DeleteUserAddress('addressId'));

      expect(result).toEqual(true);
    });
  });
});
