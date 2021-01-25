import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { GlobalMessageActions, GlobalMessageType } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserProfileAdapter } from '../../connectors/user-profile.adapter';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';
import { ResetPasswordEffects } from './reset-password.effect';

describe('', () => {
  let service: UserProfileConnector;
  let effect: ResetPasswordEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResetPasswordEffects,
        { provide: UserProfileAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(ResetPasswordEffects);
    service = TestBed.inject(UserProfileConnector);

    spyOn(service, 'resetPassword').and.returnValue(of({}));
  });

  describe('resetPassword$', () => {
    it('should be able to reset password', () => {
      const action = new UserProfileActions.ResetPassword({
        token: 'teset token',
        password: 'test password',
      });
      const completion1 = new UserProfileActions.ResetPasswordSuccess();
      const completion2 = new GlobalMessageActions.AddMessage({
        text: { key: 'forgottenPassword.passwordResetSuccess' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.resetPassword$).toBeObservable(expected);
    });
  });
});
