import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions/update-password.action';
import * as fromEffects from './update-password.effect';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserAdapter } from '../../connectors/user/user.adapter';

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

    updatePasswordEffect = TestBed.get(fromEffects.UpdatePasswordEffects);
    userService = TestBed.get(UserConnector);
  });

  describe('updatePassword$', () => {
    it('should return UpdatePasswordSuccess action', () => {
      spyOn(userService, 'updatePassword').and.returnValue(of({}));

      const userId = 'user@email.com';
      const oldPassword = 'oldPwd123';
      const newPassword = 'newPwd345';

      const action = new fromActions.UpdatePassword({
        userId,
        oldPassword,
        newPassword,
      });
      const completion = new fromActions.UpdatePasswordSuccess();

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

      const action = new fromActions.UpdatePassword({
        userId,
        oldPassword,
        newPassword,
      });
      const completion = new fromActions.UpdatePasswordFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updatePasswordEffect.updatePassword$).toBeObservable(expected);
    });
  });
});
