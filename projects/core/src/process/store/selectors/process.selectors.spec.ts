import { TestBed } from '@angular/core/testing';

import { StoreModule, Store, select } from '@ngrx/store';

import { PROCESS_FEATURE, StateWithProcess } from '../process-state';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { User } from '../../../occ';
import { LoaderState } from '../../../state';
import * as fromUserActions from '../../../user/store/actions';

const mockUpdatedUserDetails: User = {
  firstName: 'New First',
  lastName: 'New Last'
};

describe('Process selectors', () => {
  let store: Store<StateWithProcess>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PROCESS_FEATURE, fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getUpdateUserDetailsState', () => {
    it('should return loader state for update user', () => {
      store.dispatch(
        new fromUserActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: LoaderState<void>;
      store
        .pipe(select(fromSelectors.getUpdateUserDetailsState))
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

  describe('getUpdateUserDetailsLoading', () => {
    it('should return loading flag for user update state', () => {
      store.dispatch(
        new fromUserActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: boolean;
      store
        .pipe(select(fromSelectors.getUpdateUserDetailsLoading))
        .subscribe(state => (result = state))
        .unsubscribe();

      expect(result).toEqual(false);
    });
  });

  describe('getUpdateUserDetailsError', () => {
    it('should return error flag for user update state', () => {
      store.dispatch(
        new fromUserActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: boolean;
      store
        .pipe(select(fromSelectors.getUpdateUserDetailsError))
        .subscribe(state => (result = state))
        .unsubscribe();

      expect(result).toEqual(false);
    });
  });

  describe('getUpdateUserDetailsSuccess', () => {
    it('should return success flag for user update state', () => {
      store.dispatch(
        new fromUserActions.UpdateUserDetailsSuccess(mockUpdatedUserDetails)
      );

      let result: boolean;
      store
        .pipe(select(fromSelectors.getUpdateUserDetailsSuccess))
        .subscribe(state => (result = state))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
