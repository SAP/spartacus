import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';

import { ForgotPasswordEffects } from './forgot-password.effect';
import { GlobalMessageType, AddMessage } from '../../../global-message/index';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserAdapter } from '../../connectors/user/user.adapter';

describe('', () => {
  let service: UserConnector;
  let effect: ForgotPasswordEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ForgotPasswordEffects,
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(ForgotPasswordEffects);
    service = TestBed.get(UserConnector);

    spyOn(service, 'requestForgotPasswordEmail').and.returnValue(of({}));
  });

  describe('requestForgotPasswordEmail$', () => {
    it('should be able to request a forgot password email', () => {
      const action = new fromActions.ForgotPasswordEmailRequest(
        'test@test.com'
      );
      const completion1 = new fromActions.ForgotPasswordEmailRequestSuccess();
      const completion2 = new AddMessage({
        text: { key: 'forgottenPassword.passwordResetEmailSent' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.requestForgotPasswordEmail$).toBeObservable(expected);
    });
  });
});
