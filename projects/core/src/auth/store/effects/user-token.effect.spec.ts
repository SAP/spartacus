import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { UserTokenEffects } from './user-token.effect';

import { Observable, of } from 'rxjs';
import { UserToken } from '../../models/token-types.model';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { UserAuthenticationTokenService } from './../../services/user-authentication/user-authentication-token.service';
import { UserTokenAction } from './../actions';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
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
  let actions$: Observable<UserTokenAction>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserTokenEffects,
        {
          provide: UserAuthenticationTokenService,
          useClass: UserAuthenticationTokenServiceMock
        },
        provideMockActions(() => actions$)
      ]
    });

    userTokenEffect = TestBed.get(UserTokenEffects);
    userTokenService = TestBed.get(UserAuthenticationTokenService);

    spyOn(userTokenService, 'loadToken').and.returnValue(of(testToken));
    spyOn(userTokenService, 'refreshToken').and.returnValue(of(testToken));
  });

  describe('loadUserToken$', () => {
    it('should load a user token', () => {
      const action = new fromActions.LoadUserToken({
        userId: 'xxx',
        password: 'xxx'
      });
      const completion = new fromActions.LoadUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.loadUserToken$).toBeObservable(expected);
    });
  });

  describe('refreshUserToken$', () => {
    it('should refresh a user token', () => {
      const action = new fromActions.RefreshUserToken({
        userId: 'xxx',
        refreshToken: '123'
      });
      const completion = new fromActions.RefreshUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.refreshUserToken$).toBeObservable(expected);
    });
  });
});
