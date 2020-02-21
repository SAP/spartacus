import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { UserAdapter } from '../../connectors/user/user.adapter';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';
import * as fromEffects from './update-password.effect';

describe('Update Password Effect', () => {
  let updatePasswordEffect: fromEffects.UpdatePasswordEffects;
  let userService: UserConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffects.UpdatePasswordEffects,
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    updatePasswordEffect = TestBed.inject(fromEffects.UpdatePasswordEffects);
    userService = TestBed.inject(UserConnector);
  });

  describe('updatePassword$', () => {
    it('should return UpdatePasswordSuccess action', () => {
      spyOn(userService, 'updatePassword').and.returnValue(of({}));

      const userId = 'user@email.com';
      const oldPassword = 'oldPwd123';
      const newPassword = 'newPwd345';

      const action = new UserActions.UpdatePassword({
        userId,
        oldPassword,
        newPassword,
      });
      const completion = new UserActions.UpdatePasswordSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updatePasswordEffect.updatePassword$).toBeObservable(expected);
    });

    it('should return UpdatePasswordFail action', () => {
      const error = 'error';
      spyOn(userService, 'updatePassword').and.returnValue(throwError(error));

      const userId = 'user@email.com';
      const oldPassword = 'oldPwd123';
      const newPassword = 'newPwd345';

      const action = new UserActions.UpdatePassword({
        userId,
        oldPassword,
        newPassword,
      });
      const completion = new UserActions.UpdatePasswordFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updatePasswordEffect.updatePassword$).toBeObservable(expected);
    });
  });
});
