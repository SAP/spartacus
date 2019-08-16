import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserToken } from '../../models/token-types.model';
import { UserAuthenticationTokenService } from '../../services/user-authentication/user-authentication-token.service';
import { AuthActions } from '../actions/index';
import { CustomerSupportAgentTokenEffects } from './csagent-token.effect';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

class UserAuthenticationTokenServiceMock {
  loadToken(_userId: string, _password: string): Observable<UserToken> {
    return;
  }
}

describe('CustomerSupportAgentTokenEffects', () => {
  let userTokenService: UserAuthenticationTokenService;
  let customerSupportAgentTokenEffects: CustomerSupportAgentTokenEffects;
  let actions$: Observable<AuthActions.UserTokenAction>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerSupportAgentTokenEffects,
        {
          provide: UserAuthenticationTokenService,
          useClass: UserAuthenticationTokenServiceMock,
        },
        provideMockActions(() => actions$),
      ],
    });

    customerSupportAgentTokenEffects = TestBed.get(
      CustomerSupportAgentTokenEffects as Type<CustomerSupportAgentTokenEffects>
    );
    userTokenService = TestBed.get(UserAuthenticationTokenService as Type<
      UserAuthenticationTokenService
    >);

    spyOn(userTokenService, 'loadToken').and.returnValue(of(testToken));
  });

  describe('loadCustomerSupportAgentToken$', () => {
    it('should load a user token for the customer support agent', () => {
      const action = new AuthActions.LoadCustomerSupportAgentToken({
        userId: 'xxx',
        password: 'xxx',
      });
      const completion = new AuthActions.LoadCustomerSupportAgentTokenSuccess(
        testToken
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        customerSupportAgentTokenEffects.loadCustomerSupportAgentToken$
      ).toBeObservable(expected);
    });
  });
});
