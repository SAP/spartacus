import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
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
  userId: 'xxx',
};

const expiredToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: '123',
  expires_in: 1000,
  scope: ['xxx'],
  userId: '123-456-789',
};

class UserAuthenticationTokenServiceMock {
  loadToken(_userId: string, _password: string): Observable<UserToken> {
    return;
  }

  refreshToken(_refreshToken: string): Observable<UserToken> {
    return;
  }
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
        provideMockActions(() => actions$),
      ],
    });

    userTokenEffect = TestBed.get(UserTokenEffects as Type<UserTokenEffects>);
    userTokenService = TestBed.get(UserAuthenticationTokenService as Type<
      UserAuthenticationTokenService
    >);

    spyOn(userTokenService, 'loadToken').and.returnValue(of(testToken));
    spyOn(userTokenService, 'refreshToken').and.returnValue(of(testToken));
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
    });
  });

  describe('refreshUserToken$', () => {
    it('should refresh a user token', () => {
      const action = new AuthActions.RefreshUserToken({
        refreshToken: '123',
        expiredToken,
      });
      const completion = new AuthActions.RefreshUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.refreshUserToken$).toBeObservable(expected);
    });
  });
});
