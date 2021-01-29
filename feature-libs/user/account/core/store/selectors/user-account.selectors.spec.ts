import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { User } from '../../model/index';
import { UserAccountActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import {
  StateWithUserAccount,
  USER_ACCOUNT_FEATURE,
} from '../user-account.state';
import { UserAccountSelectors } from './index';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID',
};

describe('User Details Selectors', () => {
  let store: Store<StateWithUserAccount>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          USER_ACCOUNT_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getDetails', () => {
    it('should return a user details', () => {
      let result: User;
      store
        .pipe(select(UserAccountSelectors.getDetails))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new UserAccountActions.LoadUserAccountSuccess(mockUserDetails)
      );

      expect(result).toEqual(mockUserDetails);
    });
  });
});
