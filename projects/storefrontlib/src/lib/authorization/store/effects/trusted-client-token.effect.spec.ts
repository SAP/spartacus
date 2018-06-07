import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { of, Observable, throwError } from 'rxjs';

import * as fromActions from '../actions';
import { TrustedClientTokenEffect } from './trusted-client-token.effect';
import { OccClientAuthTokenService } from '../../../occ/client-auth/client-auth-token.service';
import { TrustedClientToken } from '../../../user/models/token-types.model';
import { provideMockActions } from '@ngrx/effects/testing';

const testToken: TrustedClientToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 10000,
  scope: ''
};

class MockTrustedClientTokenService {
  loadTrustedClientToken(): Observable<any> {
    return;
  }
}

describe('TrustedClientTokenEffect', () => {
  let effect: TrustedClientTokenEffect;
  let service: OccClientAuthTokenService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrustedClientTokenEffect,
        {
          provide: OccClientAuthTokenService,
          useClass: MockTrustedClientTokenService
        },
        provideMockActions(() => actions$)
      ]
    });
    effect = TestBed.get(TrustedClientTokenEffect);
    service = TestBed.get(OccClientAuthTokenService);
  });

  describe('loadTrustedClientToken', () => {
    let action;

    beforeEach(() => {
      action = new fromActions.LoadTrustedClientToken();
    });

    it('should load a trusted client token', () => {
      spyOn(service, 'loadTrustedClientToken').and.returnValue(of(testToken));
      const completion = new fromActions.LoadTrustedClientTokenSuccess(
        testToken
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadTrustedClientToken$).toBeObservable(expected);
    });

    it('should handle error', () => {
      spyOn(service, 'loadTrustedClientToken').and.returnValue(
        throwError('error')
      );
      const completion = new fromActions.LoadTrustedClientTokenFail('error');

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadTrustedClientToken$).toBeObservable(expected);
    });
  });
});
