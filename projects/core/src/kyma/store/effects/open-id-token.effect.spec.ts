import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as fromStore from '../';
import { UserToken } from '../../../auth';
import { AuthActions } from '../../../auth/store/actions/index';
import { KymaConfig } from '../../config/kyma-config';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { OpenIdAuthenticationTokenService } from '../../services/open-id-token/open-id-token.service';
import { KymaActions } from '../actions/index';

const testToken = {
  access_token: 'xxx',
} as OpenIdToken;

const mockUserToken = {
  access_token: 'yyy',
} as UserToken;

class MockOpenIdAuthenticationTokenService {
  loadOpenIdAuthenticationToken(
    _userId: string,
    _password: string
  ): Observable<OpenIdToken> {
    return of();
  }
}

const mockConfigValue: KymaConfig = {
  authentication: {
    kyma_enabled: true,
  },
};

describe('Open ID Token Effect', () => {
  let openIdTokenEffect: fromStore.OpenIdTokenEffect;
  let openIdService: OpenIdAuthenticationTokenService;
  let actions$: Observable<KymaActions.OpenIdTokenActions>;
  let mockConfig: KymaConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromStore.OpenIdTokenEffect,
        {
          provide: OpenIdAuthenticationTokenService,
          useClass: MockOpenIdAuthenticationTokenService,
        },
        {
          provide: KymaConfig,
          useValue: mockConfigValue,
        },
        provideMockActions(() => actions$),
      ],
    });

    openIdTokenEffect = TestBed.inject(fromStore.OpenIdTokenEffect);
    openIdService = TestBed.inject(OpenIdAuthenticationTokenService);
    mockConfig = TestBed.inject(KymaConfig);

    spyOn(openIdService, 'loadOpenIdAuthenticationToken').and.returnValue(
      of(testToken)
    );
  });

  describe('triggerOpenIdTokenLoading$', () => {
    describe('when kyma integration is enabled', () => {
      it('should trigger the retrieval of an open ID token', () => {
        mockConfig.authentication.kyma_enabled = true;

        const loadUserTokenSuccess = new AuthActions.LoadUserTokenSuccess(
          mockUserToken
        );
        const loadUserToken = new AuthActions.LoadUserToken({
          userId: 'xxx@xxx.xxx',
          password: 'pwd',
        });
        const completition = new KymaActions.LoadOpenIdToken({
          username: 'xxx@xxx.xxx',
          password: 'pwd',
        });

        actions$ = hot('-(ab)', { a: loadUserToken, b: loadUserTokenSuccess });
        const expected = cold('-c', { c: completition });

        expect(openIdTokenEffect.triggerOpenIdTokenLoading$).toBeObservable(
          expected
        );
      });
    });

    describe('when kyma integration is NOT enabled', () => {
      it('should NOT trigger the retrieval of an open ID token', () => {
        mockConfig.authentication.kyma_enabled = false;

        const loadUserTokenSuccess = new AuthActions.LoadUserTokenSuccess(
          mockUserToken
        );
        const loadUserToken = new AuthActions.LoadUserToken({
          userId: 'xxx@xxx.xxx',
          password: 'pwd',
        });

        actions$ = hot('-(ab)', { a: loadUserToken, b: loadUserTokenSuccess });
        const expected = cold('|');

        expect(openIdTokenEffect.triggerOpenIdTokenLoading$).toBeObservable(
          expected
        );
      });
    });
  });

  describe('loadClientToken$', () => {
    it('should load a client token', () => {
      const action = new KymaActions.LoadOpenIdToken({
        username: 'xxx@xxx.xxx',
        password: 'pwd',
      });
      const completition = new KymaActions.LoadOpenIdTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completition });

      expect(openIdTokenEffect.loadOpenIdToken$).toBeObservable(expected);
    });
  });
});
