import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OccUserService } from '../../occ/index';
import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsEffect from './user-details.effect';
import { User } from '../../../model/misc.model';

class MockOccUserService {
  loadUser(_username: string): Observable<User> {
    return of();
  }
  updateUserDetails(_username: string, _user: User): Observable<{}> {
    return of();
  }
}

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  uid: 'UID',
};

describe('User Details effect', () => {
  let userDetailsEffect: fromUserDetailsEffect.UserDetailsEffects;
  let userService: OccUserService;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserDetailsEffect.UserDetailsEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        provideMockActions(() => actions$),
      ],
    });

    userDetailsEffect = TestBed.get(fromUserDetailsEffect.UserDetailsEffects);
    userService = TestBed.get(OccUserService);
  });

  describe('loadUserDetails$', () => {
    it('should load user details', () => {
      spyOn(userService, 'loadUser').and.returnValue(of(mockUserDetails));

      const action = new fromUserDetailsAction.LoadUserDetails('mockName');
      const completion = new fromUserDetailsAction.LoadUserDetailsSuccess(
        mockUserDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userDetailsEffect.loadUserDetails$).toBeObservable(expected);
    });
  });

  describe('updateUserDetails$', () => {
    it('should return UpdateUserDetailsSuccess ', () => {
      spyOn(userService, 'updateUserDetails').and.returnValue(of({}));

      const username = 'xxx';
      const userDetails: User = {
        title: 'mr',
      };

      const action = new fromUserDetailsAction.UpdateUserDetails({
        username,
        userDetails,
      });
      const completion = new fromUserDetailsAction.UpdateUserDetailsSuccess(
        userDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userDetailsEffect.updateUserDetails$).toBeObservable(expected);
    });

    it('should return UpdateUserDetailsFail action', () => {
      const error = 'error';
      spyOn(userService, 'updateUserDetails').and.returnValue(
        throwError(error)
      );

      const username = 'xxx';
      const userDetails: User = {
        title: 'mr',
      };

      const action = new fromUserDetailsAction.UpdateUserDetails({
        username,
        userDetails,
      });
      const completion = new fromUserDetailsAction.UpdateUserDetailsFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userDetailsEffect.updateUserDetails$).toBeObservable(expected);
    });
  });
});
