import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { UserDetails } from '../../models/user-details.model';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

const mockUserDetails: UserDetails = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

fdescribe('User Details Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getUserDetails', () => {
    it('should return a user details', () => {
      let result;
      store
        .select(fromSelectors.getUserDetails)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadUserDetailsSuccess(mockUserDetails));

      expect(result).toEqual(mockUserDetails);
    });
  });
});
