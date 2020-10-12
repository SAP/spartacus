import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserIdService } from '../../facade/user-id.service';
import { UserToken } from '../../models/token-types.model';
import { UserAuthenticationTokenService } from '../../services/user-authentication/user-authentication-token.service';
import { AuthActions } from '../actions/index';
import { UserTokenEffects } from './user-token.effect';

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

  refreshToken(_refreshToken: string): Observable<UserToken> {
    return;
  }
  revoke(_userToken: UserToken): Observable<{}> {
    return;
  }
}

class MockUserIdService {
  setUserId(_id: string) {}
}

describe('UserToken effect', () => {
  let userTokenService: UserAuthenticationTokenService;
  let userTokenEffect: UserTokenEffects;
  let actions$: Observable<AuthActions.UserTokenAction>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserTokenEffects,
        {
          provide: UserAuthenticationTokenService,
          useClass: UserAuthenticationTokenServiceMock,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
        provideMockActions(() => actions$),
      ],
    });

    userTokenEffect = TestBed.inject(UserTokenEffects);
    userTokenService = TestBed.inject(UserAuthenticationTokenService);

    spyOn(userTokenService, 'loadToken').and.returnValue(of(testToken));
    spyOn(userTokenService, 'refreshToken').and.returnValue(of(testToken));
    spyOn(userTokenService, 'revoke').and.returnValue(of({}));
  });

  describe('loadUserToken$', () => {
    it('should load a user token', () => {
      const action = new AuthActions.LoadUserToken({
        userId: 'xxx',
        password: 'xxx',
      });
      const completion = new AuthActions.LoadUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.loadUserToken$).toBeObservable(expected);
      expect(testToken.expiration_time).toBeDefined();
      // TODO: Test if we set occ user id
    });
  });

  describe('refreshUserToken$', () => {
    it('should refresh a user token', () => {
      const action = new AuthActions.RefreshUserToken({
        refreshToken: '123',
      });
      const completion = new AuthActions.RefreshUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.refreshUserToken$).toBeObservable(expected);
      expect(testToken.expiration_time).toBeDefined();
    });
  });

  describe('revokeUserToken$', () => {
    it('should revoke a user token', () => {
      const action = new AuthActions.RevokeUserToken(testToken);
      const completion = new AuthActions.RevokeUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.revokeUserToken$).toBeObservable(expected);
    });
  });
});
