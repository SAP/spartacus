import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { GlobalMessageActions } from '../../../global-message/store/actions/index';
import { UserAdapter } from '../../connectors/user/user.adapter';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';
import { ResetPasswordEffects } from './reset-password.effect';

describe('', () => {
  let service: UserConnector;
  let effect: ResetPasswordEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResetPasswordEffects,
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(ResetPasswordEffects);
    service = TestBed.inject(UserConnector);

    spyOn(service, 'resetPassword').and.returnValue(of({}));
  });

  describe('resetPassword$', () => {
    it('should be able to reset password', () => {
      const action = new UserActions.ResetPassword({
        token: 'teset token',
        password: 'test password',
      });
      const completion1 = new UserActions.ResetPasswordSuccess();
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
