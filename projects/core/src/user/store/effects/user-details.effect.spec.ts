import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsEffect from './user-details.effect';
import { User } from '../../../model/misc.model';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserAdapter } from '../../connectors/user/user.adapter';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  uid: 'UID',
};

describe('User Details effect', () => {
  let userDetailsEffect: fromUserDetailsEffect.UserDetailsEffects;
  let userService: UserConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserDetailsEffect.UserDetailsEffects,
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    userDetailsEffect = TestBed.get(fromUserDetailsEffect.UserDetailsEffects);
    userService = TestBed.get(UserConnector);
  });

  describe('loadUserDetails$', () => {
    it('should load user details', () => {
      spyOn(userService, 'get').and.returnValue(of(mockUserDetails));

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
      spyOn(userService, 'update').and.returnValue(of({}));

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
      spyOn(userService, 'update').and.returnValue(throwError(error));

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
