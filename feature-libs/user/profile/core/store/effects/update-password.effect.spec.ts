import * as AngularCore from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { UserProfileAdapter } from '../../connectors/user-profile.adapter';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';
import * as fromEffects from './update-password.effect';

describe('Update Password Effect', () => {
  let updatePasswordEffect: fromEffects.UpdatePasswordEffects;
  let userService: UserProfileConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffects.UpdatePasswordEffects,
        { provide: UserProfileAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    updatePasswordEffect = TestBed.inject(fromEffects.UpdatePasswordEffects);
    userService = TestBed.inject(UserProfileConnector);

    // avoid warnings because of incorrect error
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
  });

  describe('updatePassword$', () => {
    it('should return UpdatePasswordSuccess action', () => {
      spyOn(userService, 'updatePassword').and.returnValue(of({}));

      const userId = 'user@email.com';
      const oldPassword = 'oldPwd123';
      const newPassword = 'newPwd345';

      const action = new UserProfileActions.UpdatePassword({
        uid: userId,
        oldPassword,
        newPassword,
      });
      const completion = new UserProfileActions.UpdatePasswordSuccess();

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

      const action = new UserProfileActions.UpdatePassword({
        uid: userId,
        oldPassword,
        newPassword,
      });
      const completion = new UserProfileActions.UpdatePasswordFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updatePasswordEffect.updatePassword$).toBeObservable(expected);
    });
  });
});
