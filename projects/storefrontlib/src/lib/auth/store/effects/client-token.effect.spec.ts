import { TestBed } from '@angular/core/testing';

import { ClientAuthenticationTokenService } from '@auth/services/client-authentication/client-authentication-token.service';
import { ClientAuthenticationToken } from '@auth/models/token-types.model';
import * as fromStore from '@auth/store';

import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

const testToken: ClientAuthenticationToken = {
  access_token: 'xxx',
  token_type: 'xxx',
  expires_in: 1,
  scope: 'xxx'
};

class ClientAuthenticationTokenServiceMock {
  loadClientAuthenticationToken() {}
}

describe('ClientTokenEffect', () => {
  let clientTokenEffect: fromStore.ClientTokenEffect;
  let clientAuthenticationTokenService: ClientAuthenticationTokenService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromStore.ClientTokenEffect,
        {
          provide: ClientAuthenticationTokenService,
          useClass: ClientAuthenticationTokenServiceMock
        },
        provideMockActions(() => actions$)
      ]
    });

    clientTokenEffect = TestBed.get(fromStore.ClientTokenEffect);
    clientAuthenticationTokenService = TestBed.get(
      ClientAuthenticationTokenService
    );

    spyOn(
      clientAuthenticationTokenService,
      'loadClientAuthenticationToken'
    ).and.returnValue(of(testToken));
  });

  describe('loadClientToken$', () => {
    it('should load a client token', () => {
      const action = new fromStore.LoadClientToken();
      const completition = new fromStore.LoadClientTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completition });

      expect(clientTokenEffect.loadClientToken$).toBeObservable(expected);
    });
  });
});
