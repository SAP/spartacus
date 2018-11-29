import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccUserService } from '../../occ';
import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsEffect from './user-details.effect';

class MockOccUserService {
  loadUser(_username: string): Observable<any> {
    return;
  }
}

const mockUserDetails: any = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

describe('User Details effect', () => {
  let userDetailsEffect: fromUserDetailsEffect.UserDetailsEffects;
  let userService: OccUserService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserDetailsEffect.UserDetailsEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        provideMockActions(() => actions$)
      ]
    });

    userDetailsEffect = TestBed.get(fromUserDetailsEffect.UserDetailsEffects);
    userService = TestBed.get(OccUserService);

    spyOn(userService, 'loadUser').and.returnValue(of(mockUserDetails));
  });

  describe('loadUserDetails$', () => {
    it('should load user details', () => {
      const action = new fromUserDetailsAction.LoadUserDetails('mockName');
      const completion = new fromUserDetailsAction.LoadUserDetailsSuccess(
        mockUserDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userDetailsEffect.loadUserDetails$).toBeObservable(expected);
    });
  });
});
