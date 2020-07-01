import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserToken } from '../../../auth/models/token-types.model';
import { UserAuthenticationTokenService } from '../../../auth/services/user-authentication/user-authentication-token.service';
import { AuthActions } from '../../../auth/store/actions/index';
import { AsmActions } from '../actions/index';
import { CustomerSupportAgentTokenEffects } from './csagent-token.effect';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
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

    customerSupportAgentTokenEffects = TestBed.inject(
      CustomerSupportAgentTokenEffects
    );
    userTokenService = TestBed.inject(UserAuthenticationTokenService);

    spyOn(userTokenService, 'loadToken').and.returnValue(of(testToken));
  });

  describe('loadCustomerSupportAgentToken$', () => {
    it('should load a user token for the customer support agent', () => {
      const action = new AsmActions.LoadCustomerSupportAgentToken({
        userId: 'xxx',
        password: 'xxx',
      });
      const completion = new AsmActions.LoadCustomerSupportAgentTokenSuccess(
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
