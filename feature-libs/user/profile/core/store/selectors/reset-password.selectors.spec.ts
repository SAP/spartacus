import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../reducers';
import { UserProfileSelectors } from '../selectors/index';
import {
  StateWithUserProfile,
  USER_PROFILE_FEATURE,
} from '../user-profile.state';

describe('Reset Password Selectors', () => {
  let store: Store<StateWithUserProfile>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          USER_PROFILE_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getResetPassword', () => {
    it('should return the resetPassword state from the store', () => {
      let result: boolean;
      store
        .pipe(select(UserProfileSelectors.getResetPassword))
        .subscribe((value) => (result = value));
      expect(result).toBeFalsy();
    });
  });
});
