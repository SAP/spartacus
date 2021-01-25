import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { GlobalMessageActions, GlobalMessageType } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';
import { ForgotPasswordEffects } from './forgot-password.effect';

class MockUserProfileConnector {
  requestForgotPasswordEmail() {}
}

describe('UserProfileConnector', () => {
  let service: UserProfileConnector;
  let effect: ForgotPasswordEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ForgotPasswordEffects,
        { provide: UserProfileConnector, useClass: MockUserProfileConnector },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(ForgotPasswordEffects);
    service = TestBed.inject(UserProfileConnector);

    spyOn(service, 'requestForgotPasswordEmail').and.returnValue(of({}));
  });

  describe('requestForgotPasswordEmail$', () => {
    it('should be able to request a forgot password email', () => {
      const action = new UserProfileActions.ForgotPasswordEmailRequest(
        'test@test.com'
      );
      const completion1 = new UserProfileActions.ForgotPasswordEmailRequestSuccess();
      const completion2 = new GlobalMessageActions.AddMessage({
        text: { key: 'forgottenPassword.passwordResetEmailSent' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.requestForgotPasswordEmail$).toBeObservable(expected);
    });
  });
});
