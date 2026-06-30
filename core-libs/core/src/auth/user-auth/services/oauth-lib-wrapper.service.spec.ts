import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  AuthConfig,
  Config,
  ConfigInitializerService,
  FeatureToggles,
  FederatedLoginService,
  OAUTH_REDIRECT_FLOW_KEY,
  SemanticPathService,
} from '@spartacus/core';
import { OAuthEvent, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { WindowRef } from '../../../window';
import { AuthConfigService } from './auth-config.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

class MockSemanticPathService implements Partial<SemanticPathService> {
  get(_routeName: string): string | undefined {
    return '/sign-in';
  }
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getBaseUrl() {
    return 'base';
  }
  getTokenEndpoint() {
    return 'token';
  }
  getLoginUrl() {
    return 'login';
  }
  getClientId() {
    return 'client_id';
  }
  getClientSecret() {
    return 'dummySecret';
  }
  getRevokeEndpoint() {
    return 'revoke';
  }
  getLogoutUrl() {
    return 'logout';
  }
  getUserinfoEndpoint() {
    return 'userinfo';
  }
  getOAuthLibConfig() {
    return {
      clearHashAfterLogin: true,
      issuer: 'issuer',
      redirectUri: 'redUri',
    };
  }
}

class MockOAuthService implements Partial<OAuthService> {
  configure() {}
  fetchTokenUsingPasswordFlow() {
    return Promise.resolve({ state: 'done' } as TokenResponse);
  }
  refreshToken() {
    return Promise.resolve({} as TokenResponse);
  }
  logOut() {}
  getIdToken() {
    return 'token';
  }
  initLoginFlow() {}
  tryLogin() {
    return Promise.resolve(true);
  }
  revokeTokenAndLogout() {
    return Promise.resolve(true);
  }
}

class MockFeatureToggles implements Partial<FeatureToggles> {
  asyncAuthConfigInitializer = false;
  authorizationCodeFlowByDefault = false;
}

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  enabled = false;
  isLoginDomain = false;
  origin: string | undefined = undefined;
  detectContext = vi.fn();
  getParameters = vi.fn().mockReturnValue(of('ctx=de:en'));
}

class MockStorage implements Storage {
  _store: Record<string, string | null> = {};

  get length() {
    return Object.keys(this._store).length;
  }

  clear() {
    this._store = {};
  }

  key(index: number): string | null {
    return Object.keys(this._store)[index] ?? null;
  }

  getItem(key: string): string | null {
    return key in this._store ? this._store[key] : null;
  }

  setItem(key: string, value: string) {
    this._store[key] = value;
  }

  removeItem(key: string): void {
    if (key in this._store) {
      delete this._store[key];
    }
  }
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable(..._scopes: string[]): Observable<Config> {
    return of(<Config>{});
  }
}

const mockWindowRef = {
  localStorage: new MockStorage(),
  isBrowser(): boolean {
    return true;
  },
  nativeWindow: {
    location: {
      origin: 'test.com',
    },
  },
  location: { href: undefined },
};

describe('OAuthLibWrapperService', () => {
  let service: OAuthLibWrapperService;
  let oAuthService: OAuthService;
  let winRef: WindowRef;
  let authConfigService: AuthConfigService;
  let featureToggles: FeatureToggles;
  let federatedLoginService: MockFederatedLoginService;
  let configInitializerService: MockConfigInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OAuthLibWrapperService,
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        { provide: OAuthService, useClass: MockOAuthService },
        { provide: WindowRef, useValue: mockWindowRef },
        { provide: FeatureToggles, useClass: MockFeatureToggles },
        {
          provide: FederatedLoginService,
          useClass: MockFederatedLoginService,
        },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
      ],
    });
    oAuthService = TestBed.inject(OAuthService);
    winRef = TestBed.inject(WindowRef);
    authConfigService = TestBed.inject(AuthConfigService);
    featureToggles = TestBed.inject(FeatureToggles);
    federatedLoginService = TestBed.inject(
      FederatedLoginService
    ) as unknown as MockFederatedLoginService;
    configInitializerService = TestBed.inject(ConfigInitializerService);
  });

  describe('initialize()', () => {
    it('should configure lib with the config', () => {
      vi.spyOn(oAuthService, 'configure');

      service = TestBed.inject(OAuthLibWrapperService);

      expect(oAuthService.configure).toHaveBeenCalledWith({
        tokenEndpoint: 'token',
        loginUrl: 'login',
        clientId: 'client_id',
        dummyClientSecret: 'dummySecret',
        revocationEndpoint: 'revoke',
        logoutUrl: 'logout',
        userinfoEndpoint: 'userinfo',
        issuer: 'issuer',
        redirectUri: 'redUri',
        clearHashAfterLogin: true,
      });
    });

    it('should use redirectUrl on SSR when passed', () => {
      vi.spyOn(oAuthService, 'configure');
      vi.spyOn(winRef, 'isBrowser').mockReturnValue(false);

      service = TestBed.inject(OAuthLibWrapperService);

      expect(oAuthService.configure).toHaveBeenCalledWith(
        expect.objectContaining({
          redirectUri: 'redUri',
        })
      );
    });

    it('should use current location as a redirectUrl when not explicitly set in browser', () => {
      vi.spyOn(oAuthService, 'configure');
      vi.spyOn(authConfigService, 'getOAuthLibConfig').mockReturnValue({});

      service = TestBed.inject(OAuthLibWrapperService);

      expect(oAuthService.configure).toHaveBeenCalledWith(
        expect.objectContaining({
          redirectUri: winRef.nativeWindow?.location.origin,
          issuer: 'base',
        })
      );
    });

    it('should use "" as a redirectUrl when not explicitly set on SSR', () => {
      vi.spyOn(oAuthService, 'configure');
      vi.spyOn(winRef, 'isBrowser').mockReturnValue(false);
      vi.spyOn(authConfigService, 'getOAuthLibConfig').mockReturnValue({});

      service = TestBed.inject(OAuthLibWrapperService);

      expect(oAuthService.configure).toHaveBeenCalledWith(
        expect.objectContaining({
          redirectUri: '',
        })
      );
    });

    it('should detect federated login context to ensure FederatedLoginService is initialized', () => {
      service = TestBed.inject(OAuthLibWrapperService);

      expect(federatedLoginService.detectContext).toHaveBeenCalled();
    });

    it('should not subscribe to getParameters when federated login is disabled', () => {
      service = TestBed.inject(OAuthLibWrapperService);

      expect(federatedLoginService.getParameters).not.toHaveBeenCalled();
    });

    describe('when asyncAuthConfigInitializer is enabled', () => {
      beforeEach(() => {
        featureToggles.asyncAuthConfigInitializer = true;
      });

      it('should wait for a stable configuration before configuring', () => {
        const getStable = new ReplaySubject<AuthConfig>(1);
        vi.spyOn(configInitializerService, 'getStable').mockReturnValue(
          getStable.asObservable()
        );
        vi.spyOn(oAuthService, 'configure');

        service = TestBed.inject(OAuthLibWrapperService);

        expect(configInitializerService.getStable).toHaveBeenCalled();
        expect(oAuthService.configure).not.toHaveBeenCalled();

        getStable.next({});

        expect(oAuthService.configure).toHaveBeenCalled();
      });
    });

    describe('when federated login is enabled', () => {
      beforeEach(() => {
        federatedLoginService.enabled = true;
      });

      it('should re-configure the auth service with federated login context parameters on loginUrl', () => {
        vi.spyOn(oAuthService, 'configure');
        vi.spyOn(authConfigService, 'getOAuthLibConfig').mockReturnValue({});

        service = TestBed.inject(OAuthLibWrapperService);

        expect(federatedLoginService.getParameters).toHaveBeenCalled();
        expect(oAuthService.configure).toHaveBeenCalledWith(
          expect.objectContaining({
            loginUrl: 'login?ctx=de:en',
          })
        );
      });

      it('should append params with & when loginUrl already has a query string', () => {
        vi.spyOn(oAuthService, 'configure');
        vi.spyOn(authConfigService, 'getLoginUrl').mockReturnValue(
          'login?foo=bar'
        );
        vi.spyOn(authConfigService, 'getOAuthLibConfig').mockReturnValue({});

        service = TestBed.inject(OAuthLibWrapperService);

        expect(oAuthService.configure).toHaveBeenCalledWith(
          expect.objectContaining({
            loginUrl: 'login?foo=bar&ctx=de:en',
          })
        );
      });

      describe('when on a login domain', () => {
        const originatingDomain = 'https://storefront.de';

        beforeEach(() => {
          federatedLoginService.isLoginDomain = true;
          federatedLoginService.origin = originatingDomain;
        });

        it('should use origin as base href for redirectUri', () => {
          vi.spyOn(oAuthService, 'configure');
          vi.spyOn(authConfigService, 'getOAuthLibConfig').mockReturnValue({});

          service = TestBed.inject(OAuthLibWrapperService);

          expect(oAuthService.configure).toHaveBeenCalledWith(
            expect.objectContaining({
              redirectUri: originatingDomain,
            })
          );
        });
      });
    });
  });

  describe('authorizeWithPasswordFlow()', () => {
    it('should call fetchTokenUsingPasswordFlow method from the lib', async () => {
      vi.spyOn(oAuthService, 'fetchTokenUsingPasswordFlow');
      service = TestBed.inject(OAuthLibWrapperService);

      const result = await service.authorizeWithPasswordFlow(
        'username',
        'pass'
      );

      expect(result).toEqual({ state: 'done' } as TokenResponse);
      expect(oAuthService.fetchTokenUsingPasswordFlow).toHaveBeenCalledWith(
        'username',
        'pass'
      );
    });

    describe('when asyncAuthConfigInitializer is enabled', () => {
      beforeEach(() => {
        featureToggles.asyncAuthConfigInitializer = true;
      });

      it('should wait to call fetchTokenUsingPasswordFlow until the oauth service is configured', async () => {
        const getStable = new ReplaySubject<AuthConfig>(1);
        vi.spyOn(configInitializerService, 'getStable').mockReturnValue(
          getStable.asObservable()
        );
        vi.spyOn(oAuthService, 'fetchTokenUsingPasswordFlow');
        service = TestBed.inject(OAuthLibWrapperService);

        expect(oAuthService.fetchTokenUsingPasswordFlow).not.toHaveBeenCalled();

        getStable.next({});
        await service.authorizeWithPasswordFlow('username', 'pass');

        expect(oAuthService.fetchTokenUsingPasswordFlow).toHaveBeenCalled();
      });
    });
  });

  describe('refreshToken()', () => {
    let getStable: Subject<AuthConfig>;

    beforeEach(() => {
      getStable = new ReplaySubject(1);
      vi.spyOn(configInitializerService, 'getStable').mockReturnValue(
        getStable.asObservable()
      );
    });

    describe('when asyncAuthConfigInitializer is enabled', () => {
      beforeEach(() => {
        featureToggles.asyncAuthConfigInitializer = true;
      });

      it('should wait to call refreshToken until the oauth service is configured', () => {
        vi.spyOn(oAuthService, 'refreshToken');
        service = TestBed.inject(OAuthLibWrapperService);

        service.refreshToken();

        expect(oAuthService.refreshToken).not.toHaveBeenCalled();

        getStable.next({});

        expect(oAuthService.refreshToken).toHaveBeenCalled();
      });
    });

    it('should call refreshToken method from lib', () => {
      vi.spyOn(oAuthService, 'refreshToken');
      service = TestBed.inject(OAuthLibWrapperService);
      getStable.next({});

      service.refreshToken();

      expect(oAuthService.refreshToken).toHaveBeenCalled();
    });
  });

  describe('revokeAndLogout()', () => {
    describe('when asyncAuthConfigInitializer is enabled', () => {
      beforeEach(() => {
        featureToggles.asyncAuthConfigInitializer = true;
      });

      it('should wait to call revokeTokenAndLogout until the oauth service is configured', async () => {
        const getConfig = new ReplaySubject<AuthConfig>(1);
        vi.spyOn(configInitializerService, 'getStable').mockReturnValue(
          getConfig.asObservable()
        );
        vi.spyOn(oAuthService, 'revokeTokenAndLogout');
        service = TestBed.inject(OAuthLibWrapperService);

        const actual = service.revokeAndLogout();

        expect(oAuthService.revokeTokenAndLogout).not.toHaveBeenCalled();

        getConfig.next({});
        await actual;

        expect(oAuthService.revokeTokenAndLogout).toHaveBeenCalled();
      });
    });

    it('should call revokeTokenAndLogout method from the lib', async () => {
      vi.spyOn(oAuthService, 'revokeTokenAndLogout');
      vi.spyOn(oAuthService, 'logOut');
      service = TestBed.inject(OAuthLibWrapperService);

      await service.revokeAndLogout();

      expect(oAuthService.revokeTokenAndLogout).toHaveBeenCalled();
      expect(oAuthService.logOut).not.toHaveBeenCalled();
    });

    it('should call logOut method from the lib when the revoke fails', async () => {
      vi.spyOn(oAuthService, 'logOut');
      vi.spyOn(oAuthService, 'revokeTokenAndLogout').mockReturnValue(
        Promise.reject()
      );
      service = TestBed.inject(OAuthLibWrapperService);

      await service.revokeAndLogout();

      expect(oAuthService.revokeTokenAndLogout).toHaveBeenCalled();
      expect(oAuthService.logOut).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    beforeEach(() => {
      service = TestBed.inject(OAuthLibWrapperService);
    });

    it('should call logOut method from the lib', () => {
      vi.spyOn(oAuthService, 'logOut');

      service.logout();

      expect(oAuthService.logOut).toHaveBeenCalled();
    });
  });

  describe('getIdToken()', () => {
    beforeEach(() => {
      service = TestBed.inject(OAuthLibWrapperService);
    });

    it('should return the result from the getIdToken method from lib', () => {
      vi.spyOn(oAuthService, 'getIdToken').mockReturnValue('id_tok');

      const token = service.getIdToken();
      expect(token).toEqual('id_tok');
    });
  });

  describe('initLoginFlow()', () => {
    describe('when asyncAuthConfigInitializer is enabled', () => {
      beforeEach(() => {
        featureToggles.asyncAuthConfigInitializer = true;
      });

      it('should wait to call initLoginFlow until the oauth service is configured', async () => {
        const getConfig = new ReplaySubject<AuthConfig>(1);
        vi.spyOn(configInitializerService, 'getStable').mockReturnValue(
          getConfig.asObservable()
        );
        vi.spyOn(oAuthService, 'initLoginFlow');
        service = TestBed.inject(OAuthLibWrapperService);

        const actual = service.initLoginFlow();

        expect(oAuthService.initLoginFlow).not.toHaveBeenCalled();

        getConfig.next({});
        await actual;

        expect(oAuthService.initLoginFlow).toHaveBeenCalled();
      });
    });

    it('should call initLoginFlow from the lib', () => {
      vi.spyOn(oAuthService, 'initLoginFlow');
      service = TestBed.inject(OAuthLibWrapperService);

      service.initLoginFlow();

      expect(oAuthService.initLoginFlow).toHaveBeenCalled();
    });

    it('should not set oAuth flow key in local storage when authorizationCodeFlowByDefault is enabled', () => {
      featureToggles.authorizationCodeFlowByDefault = true;
      vi.spyOn(winRef.localStorage as Storage, 'setItem');
      service = TestBed.inject(OAuthLibWrapperService);

      service.initLoginFlow();

      expect(winRef.localStorage?.setItem).not.toHaveBeenCalled();
    });

    it('should set oAuth flow key in local storage when authorizationCodeFlowByDefault is disabled', () => {
      featureToggles.authorizationCodeFlowByDefault = false;
      vi.spyOn(winRef.localStorage as Storage, 'setItem');
      service = TestBed.inject(OAuthLibWrapperService);

      service.initLoginFlow();

      expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
        'oAuthRedirectCodeFlow',
        'true'
      );
    });

    it('should set oAuth flow key in local storage', () => {
      service = TestBed.inject(OAuthLibWrapperService);

      service.initLoginFlow();

      const storedOauthFlowKey = winRef.localStorage?.getItem(
        'oAuthRedirectCodeFlow'
      );

      expect(storedOauthFlowKey).toBeTruthy();
    });

    describe('when federated login', () => {
      const originatingDomain = 'https://storefront.de';

      beforeEach(() => {
        federatedLoginService.enabled = true;
        federatedLoginService.origin = originatingDomain;
      });

      it('should set the flag for oAuth flow key', () => {
        vi.spyOn(winRef.localStorage as Storage, 'setItem');
        service = TestBed.inject(OAuthLibWrapperService);

        service.initLoginFlow();

        expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
          OAUTH_REDIRECT_FLOW_KEY,
          'true'
        );
      });

      it('should redirect to origin login page when on the login domain', () => {
        federatedLoginService.isLoginDomain = true;
        service = TestBed.inject(OAuthLibWrapperService);

        service.initLoginFlow();

        expect(winRef.location.href).toEqual(`${originatingDomain}/sign-in`);
      });
    });
  });

  describe('tryLogin()', () => {
    beforeEach(() => {
      vi.spyOn(winRef.localStorage as Storage, 'removeItem');
    });

    describe('when asyncAuthConfigInitializer is enabled', () => {
      beforeEach(() => {
        featureToggles.asyncAuthConfigInitializer = true;
      });

      it('should wait to call tryLogin until the oauth service is configured', async () => {
        const getConfig = new ReplaySubject<AuthConfig>(1);
        vi.spyOn(configInitializerService, 'getStable').mockReturnValue(
          getConfig.asObservable()
        );
        vi.spyOn(oAuthService, 'tryLogin');
        service = TestBed.inject(OAuthLibWrapperService);
        service.events$ = new BehaviorSubject<OAuthEvent>({
          type: 'token_received',
        });

        service.tryLogin();
        await Promise.resolve();

        expect(oAuthService.tryLogin).not.toHaveBeenCalled();

        getConfig.next({});
        await Promise.resolve();

        expect(oAuthService.tryLogin).toHaveBeenCalled();
      });
    });

    it('should call tryLogin method from the lib', () => {
      vi.spyOn(oAuthService, 'tryLogin');
      service = TestBed.inject(OAuthLibWrapperService);
      service.events$ = new BehaviorSubject<OAuthEvent>({
        type: 'token_received',
      });

      service.tryLogin();

      expect(oAuthService.tryLogin).toHaveBeenCalledWith({
        disableOAuth2StateCheck: true,
      });
    });

    it('should return POSITIVE token received event indication', async () => {
      service = TestBed.inject(OAuthLibWrapperService);
      service.events$ = new BehaviorSubject<OAuthEvent>({
        type: 'token_received',
      });

      const result = await service.tryLogin();

      expect(result).toEqual({
        result: true,
        tokenReceived: true,
      });
    });

    it('should return NEGATIVE token received event indication and clear the oAuth redirect key', async () => {
      service = TestBed.inject(OAuthLibWrapperService);
      service.events$ = new BehaviorSubject<OAuthEvent>({
        type: 'discovery_document_load_error',
      });

      const result = await service.tryLogin();

      expect(result).toEqual({
        result: true,
        tokenReceived: false,
      });
      expect(winRef.localStorage?.removeItem).toHaveBeenCalledWith(
        OAUTH_REDIRECT_FLOW_KEY
      );
    });

    it('should reject promise and clear the oAuth redirect key if oAuthService.tryLogin throws an error', async () => {
      const error = new Error('Login failed');
      vi.spyOn(oAuthService, 'tryLogin').mockReturnValue(Promise.reject(error));
      service = TestBed.inject(OAuthLibWrapperService);
      service.events$ = new BehaviorSubject<OAuthEvent>({
        type: 'token_received',
      });

      try {
        await service.tryLogin();
        fail('Expected tryLogin() to throw');
      } catch (err) {
        expect(err).toEqual(error);
      }

      expect(oAuthService.tryLogin).toHaveBeenCalledWith({
        disableOAuth2StateCheck: true,
      });
      expect(winRef.localStorage?.removeItem).toHaveBeenCalledWith(
        OAUTH_REDIRECT_FLOW_KEY
      );
    });
  });

  describe('refreshAuthConfig()', () => {
    beforeEach(() => {
      service = TestBed.inject(OAuthLibWrapperService);
    });

    it('should call initialize method', () => {
      const initializeSpy = vi.spyOn(service as any, 'initialize');
      service.refreshAuthConfig();
      expect(initializeSpy).toHaveBeenCalled();
    });
  });

  describe('changeAuthConfigClientId()', () => {
    beforeEach(() => {
      service = TestBed.inject(OAuthLibWrapperService);
    });

    it('should call changeClientWhenInitialize method', () => {
      const initializeSpy = vi.spyOn(service as any, 'changeClientWhenInitialize');
      service.changeAuthConfigClientId('testClientId');
      expect(initializeSpy).toHaveBeenCalled();
    });
  });
});
