import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';

import { ResetPasswordEffects } from './reset-password.effect';
import { GlobalMessageType, AddMessage } from '../../../global-message/index';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserAdapter } from '../../connectors/user/user.adapter';

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

    effect = TestBed.get(ResetPasswordEffects);
    service = TestBed.get(UserConnector);

    spyOn(service, 'resetPassword').and.returnValue(of({}));
  });

  describe('resetPassword$', () => {
    it('should be able to reset password', () => {
      const action = new fromActions.ResetPassword({
        token: 'teset token',
        password: 'test password',
      });
      const completion1 = new fromActions.ResetPasswordSuccess();
      const completion2 = new AddMessage({
        text: { key: 'forgottenPassword.passwordResetSuccess' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.resetPassword$).toBeObservable(expected);
    });
  });
});
