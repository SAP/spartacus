import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { of, Observable, throwError } from 'rxjs';

import * as fromActions from '../actions';
import { ClientAuthenticationTokenEffect } from './client-authentication-token.effect';
import { OccClientAuthenticationTokenService } from '../../../occ/client-auth/client-authentication-token.service';
import { ClientAuthenticationToken } from '../../../user/models/token-types.model';
import { provideMockActions } from '@ngrx/effects/testing';

const testToken: ClientAuthenticationToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 10000,
  scope: ''
};

class MockClientTokenService {
  loadClientAuthenticationToken(): Observable<any> {
    return;
  }
}

describe('ClientTokenEffect', () => {
  let effect: ClientAuthenticationTokenEffect;
  let service: OccClientAuthenticationTokenService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientAuthenticationTokenEffect,
        {
          provide: OccClientAuthenticationTokenService,
          useClass: MockClientTokenService
        },
        provideMockActions(() => actions$)
      ]
    });
    effect = TestBed.get(ClientAuthenticationTokenEffect);
    service = TestBed.get(OccClientAuthenticationTokenService);
  });

  describe('loadClientAuthenticationToken', () => {
    let action;

    beforeEach(() => {
      action = new fromActions.LoadClientAuthenticationToken();
    });

    it('should load a client token', () => {
      spyOn(service, 'loadClientAuthenticationToken').and.returnValue(
        of(testToken)
      );
      const completion = new fromActions.LoadClientAuthenticationTokenSuccess(
        testToken
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadClientAuthenticationToken$).toBeObservable(expected);
    });

    it('should return fail action on error', () => {
      spyOn(service, 'loadClientAuthenticationToken').and.returnValue(
        throwError('error')
      );
      const completion = new fromActions.LoadClientAuthenticationTokenFail(
        'error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadClientAuthenticationToken$).toBeObservable(expected);
    });
  });
});
