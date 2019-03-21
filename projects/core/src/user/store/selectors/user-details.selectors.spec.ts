import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import { StateWithUser, USER_FEATURE } from '../user-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';
import { LoaderState } from '../../../state';
import { User } from '../../../occ/occ-models/index';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID'
};

const mockUpdatedUserDetails: User = {
  firstName: 'New First',
  lastName: 'New Last'
};

describe('User Details Selectors', () => {
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

  describe('getDetails', () => {
    it('should return a user details', () => {
      let result: User;
      store
        .pipe(select(fromSelectors.getDetails))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadUserDetailsSuccess(mockUserDetails));

      expect(result).toEqual(mockUserDetails);
    });
  });

  describe('getUpdateDetailsState', () => {
    it('should return loader state for update user', () => {
      store.dispatch(
        new fromActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: LoaderState<void>;
      store
        .pipe(select(fromSelectors.getUpdateDetailsState))
        .subscribe(state => (result = state))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        success: true,
        error: false,
        value: undefined
      });
    });
  });

  describe('getUpdateDetailsLoading', () => {
    it('should return loading flag for user update state', () => {
      store.dispatch(
        new fromActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: boolean;
      store
        .pipe(select(fromSelectors.getUpdateDetailsLoading))
        .subscribe(state => (result = state))
        .unsubscribe();

      expect(result).toEqual(false);
    });
  });

  describe('getUpdateDetailsError', () => {
    it('should return error flag for user update state', () => {
      store.dispatch(
        new fromActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: boolean;
      store
        .pipe(select(fromSelectors.getUpdateDetailsError))
        .subscribe(state => (result = state))
        .unsubscribe();

      expect(result).toEqual(false);
    });
  });

  describe('getUpdateDetailsSuccess', () => {
    it('should return success flag for user update state', () => {
      store.dispatch(
        new fromActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: boolean;
      store
        .pipe(select(fromSelectors.getUpdateDetailsSuccess))
        .subscribe(state => (result = state))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
