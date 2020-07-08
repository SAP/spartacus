import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Address } from '../../../model/address.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const mockUserAddresses: Address[] = [{ id: 'address1' }, { id: 'address2' }];

describe('User Addresses Selectors', () => {
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

  describe('getAddressesLoaderState', () => {
    it('should return a user addresses loader state', () => {
      let result: LoaderState<Address[]>;
      store
        .pipe(select(UsersSelectors.getAddressesLoaderState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: [],
      });
    });
  });

  describe('getAddresses', () => {
    it('should return a user addresses', () => {
      let result: Address[];
      store
        .pipe(select(UsersSelectors.getAddresses))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new UserActions.LoadUserAddressesSuccess(mockUserAddresses)
      );

      expect(result).toEqual(mockUserAddresses);
    });
  });

  describe('getAddressesLoading', () => {
    it('should return loading flag', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getAddressesLoading))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new UserActions.LoadUserAddresses('userId'));

      expect(result).toEqual(true);
    });
  });

  describe('getAddressesLoadedSuccess', () => {
    it('should return loaded flag', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getAddressesLoadedSuccess))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new UserActions.LoadUserAddressesSuccess([]));

      expect(result).toEqual(true);
    });
  });
});
