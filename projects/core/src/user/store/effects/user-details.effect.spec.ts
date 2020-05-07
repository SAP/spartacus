import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../../model/misc.model';
import { UserAdapter } from '../../connectors/user/user.adapter';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';
import * as fromUserDetailsEffect from './user-details.effect';

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

    userDetailsEffect = TestBed.inject(
      fromUserDetailsEffect.UserDetailsEffects
    );
    userService = TestBed.inject(UserConnector);
  });

  describe('loadUserDetails$', () => {
    it('should load user details', () => {
      spyOn(userService, 'get').and.returnValue(of(mockUserDetails));

      const action = new UserActions.LoadUserDetails('mockName');
      const completion = new UserActions.LoadUserDetailsSuccess(
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

      const action = new UserActions.UpdateUserDetails({
        username,
        userDetails,
      });
      const completion = new UserActions.UpdateUserDetailsSuccess(userDetails);

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

      const action = new UserActions.UpdateUserDetails({
        username,
        userDetails,
      });
      const completion = new UserActions.UpdateUserDetailsFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userDetailsEffect.updateUserDetails$).toBeObservable(expected);
    });
  });
});
