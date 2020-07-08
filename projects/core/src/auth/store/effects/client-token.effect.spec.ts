import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as fromStore from '../';
import { AuthActions } from '../actions/index';
import { ClientToken } from './../../models/token-types.model';
import { ClientAuthenticationTokenService } from './../../services/client-authentication/client-authentication-token.service';

const testToken: ClientToken = {
  access_token: 'xxx',
  token_type: 'xxx',
  expires_in: 1,
  scope: 'xxx',
};

class ClientAuthenticationTokenServiceMock {
  loadClientAuthenticationToken() {}
}

describe('ClientTokenEffect', () => {
  let clientTokenEffect: fromStore.ClientTokenEffect;
  let clientAuthenticationTokenService: ClientAuthenticationTokenService;
  let actions$: Observable<AuthActions.ClientTokenAction>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromStore.ClientTokenEffect,
        {
          provide: ClientAuthenticationTokenService,
          useClass: ClientAuthenticationTokenServiceMock,
        },
        provideMockActions(() => actions$),
      ],
    });

    clientTokenEffect = TestBed.inject(fromStore.ClientTokenEffect);
    clientAuthenticationTokenService = TestBed.inject(
      ClientAuthenticationTokenService
    );

    spyOn(
      clientAuthenticationTokenService,
      'loadClientAuthenticationToken'
    ).and.returnValue(of(testToken));
  });

  describe('loadClientToken$', () => {
    it('should load a client token', () => {
      const action = new AuthActions.LoadClientToken();
      const completition = new AuthActions.LoadClientTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completition });

      expect(clientTokenEffect.loadClientToken$).toBeObservable(expected);
    });
  });
});
