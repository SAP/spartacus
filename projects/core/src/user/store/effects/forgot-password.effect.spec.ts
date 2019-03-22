import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccUserService } from '../../occ/user.service';

import { ForgotPasswordEffects } from './forgot-password.effect';
import { GlobalMessageType, AddMessage } from '../../../global-message/index';

class MockOccUserService {
  requestForgotPasswordEmail(): Observable<{}> {
    return of({});
  }
}

describe('', () => {
  let service: OccUserService;
  let effect: ForgotPasswordEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ForgotPasswordEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(ForgotPasswordEffects);
    service = TestBed.get(OccUserService);

    spyOn(service, 'requestForgotPasswordEmail').and.returnValue(of({}));
  });

  describe('requestForgotPasswordEmail$', () => {
    it('should be able to request a forgot password email', () => {
      const action = new fromActions.ForgotPasswordEmailRequest(
        'test@test.com'
      );
      const completion1 = new fromActions.ForgotPasswordEmailRequestSuccess();
      const completion2 = new AddMessage({
        text:
          'An email has been sent to you with information on how to reset your password.',
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.requestForgotPasswordEmail$).toBeObservable(expected);
    });
  });
});
