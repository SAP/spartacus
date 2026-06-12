import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  DynamicAuthConfigService,
  FeatureToggles,
  FederatedLoginService,
  OAUTH_REDIRECT_FLOW_KEY,
  SemanticPathService,
} from '@spartacus/core';
import {
  AuthConfig,
  OAuthEvent,
  OAuthService,
  TokenResponse,
} from 'angular-oauth2-oidc';
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
  dynamicAuthConfiguration = false;
  authorizationCodeFlowByDefault = false;
}

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  enabled = false;
  isLoginDomain = false;
  origin: string | undefined = undefined;
  detectContext = jasmine.createSpy();
  getParameters = jasmine.createSpy().and.returnValue(of('ctx=de:en'));
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

class MockDynamicAuthConfigService
  implements Partial<DynamicAuthConfigService>
{
  getConfig(baseConfig: AuthConfig): Observable<AuthConfig> {
    return of(baseConfig);
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
  let dynamicAuthConfigService: DynamicAuthConfigService;

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
          provide: DynamicAuthConfigService,
          useClass: MockDynamicAuthConfigService,
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
    dynamicAuthConfigService = TestBed.inject(DynamicAuthConfigService);
    dynamicAuthConfigService.getConfig({});
  });

  describe('initialize()', () => {
    it('should configure lib with the config', () => {
      spyOn(oAuthService, 'configure').and.callThrough();

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
      spyOn(oAuthService, 'configure').and.callThrough();
      spyOn(winRef, 'isBrowser').and.returnValue(false);

      service = TestBed.inject(OAuthLibWrapperService);

      expect(oAuthService.configure).toHaveBeenCalledWith(
        jasmine.objectContaining({
          redirectUri: 'redUri',
        })
      );
    });

    it('should use current location as a redirectUrl when not explicitly set in browser', () => {
      spyOn(oAuthService, 'configure').and.callThrough();
      spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

      service = TestBed.inject(OAuthLibWrapperService);

      expect(oAuthService.configure).toHaveBeenCalledWith(
        jasmine.objectContaining({
          redirectUri: winRef.nativeWindow?.location.origin,
          issuer: 'base',
        })
      );
    });

    it('should use "" as a redirectUrl when not explicitly set on SSR', () => {
      spyOn(oAuthService, 'configure').and.callThrough();
      spyOn(winRef, 'isBrowser').and.returnValue(false);
      spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

      service = TestBed.inject(OAuthLibWrapperService);

      expect(oAuthService.configure).toHaveBeenCalledWith(
        jasmine.objectContaining({
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

    describe('when dynamicAuthConfig is enabled', () => {
      beforeEach(() => {
        featureToggles.dynamicAuthConfiguration = true;
      });

      it('should use the dynamic auth config service to augment the config', () => {
        const expectedConfig: AuthConfig = { clientId: 'dynamic_client_id' };
        spyOn(dynamicAuthConfigService, 'getConfig').and.returnValue(
          of(expectedConfig)
        );
        spyOn(oAuthService, 'configure').and.callThrough();

        service = TestBed.inject(OAuthLibWrapperService);

        expect(oAuthService.configure).toHaveBeenCalledWith(expectedConfig);
      });
    });

    describe('when federated login is enabled', () => {
      beforeEach(() => {
        federatedLoginService.enabled = true;
      });

      it('should re-configure the auth service with federated login context parameters on loginUrl', () => {
        spyOn(oAuthService, 'configure').and.callThrough();
        spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

        service = TestBed.inject(OAuthLibWrapperService);

        expect(federatedLoginService.getParameters).toHaveBeenCalled();
        expect(oAuthService.configure).toHaveBeenCalledWith(
          jasmine.objectContaining({
            loginUrl: 'login?ctx=de:en',
          })
        );
      });

      it('should append params with & when loginUrl already has a query string', () => {
        spyOn(oAuthService, 'configure').and.callThrough();
        spyOn(authConfigService, 'getLoginUrl').and.returnValue(
          'login?foo=bar'
        );
        spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

        service = TestBed.inject(OAuthLibWrapperService);

        expect(oAuthService.configure).toHaveBeenCalledWith(
          jasmine.objectContaining({
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
          spyOn(oAuthService, 'configure').and.callThrough();
          spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

          service = TestBed.inject(OAuthLibWrapperService);

          expect(oAuthService.configure).toHaveBeenCalledWith(
            jasmine.objectContaining({
              redirectUri: originatingDomain,
            })
          );
        });
      });
    });
  });

  describe('authorizeWithPasswordFlow()', () => {
    it('should call fetchTokenUsingPasswordFlow method from the lib', async () => {
      spyOn(oAuthService, 'fetchTokenUsingPasswordFlow').and.callThrough();
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

    describe('when dynamicAuthConfig is enabled', () => {
      beforeEach(() => {
        featureToggles.dynamicAuthConfiguration = true;
      });

      it('should wait to call fetchTokenUsingPasswordFlow until the oauth service is configured', async () => {
        const getConfig = new ReplaySubject<AuthConfig>(1);
        spyOn(dynamicAuthConfigService, 'getConfig').and.returnValue(
          getConfig.asObservable()
        );
        spyOn(oAuthService, 'fetchTokenUsingPasswordFlow').and.callThrough();
        service = TestBed.inject(OAuthLibWrapperService);

        expect(oAuthService.fetchTokenUsingPasswordFlow).not.toHaveBeenCalled();

        getConfig.next({});
        await service.authorizeWithPasswordFlow('username', 'pass');

        expect(oAuthService.fetchTokenUsingPasswordFlow).toHaveBeenCalled();
      });
    });
  });

  describe('refreshToken()', () => {
    let getConfig: Subject<AuthConfig>;

    beforeEach(() => {
      getConfig = new ReplaySubject(1);
      spyOn(dynamicAuthConfigService, 'getConfig').and.returnValue(
        getConfig.asObservable()
      );
    });

    describe('when dynamicAuthConfig is enabled', () => {
      beforeEach(() => {
        featureToggles.dynamicAuthConfiguration = true;
      });

      it('should wait to call refreshToken until the oauth service is configured', () => {
        spyOn(oAuthService, 'refreshToken').and.callThrough();
        service = TestBed.inject(OAuthLibWrapperService);

        service.refreshToken();

        expect(oAuthService.refreshToken).not.toHaveBeenCalled();

        getConfig.next({});

        expect(oAuthService.refreshToken).toHaveBeenCalled();
      });
    });

    it('should call refreshToken method from lib', () => {
      spyOn(oAuthService, 'refreshToken').and.callThrough();
      service = TestBed.inject(OAuthLibWrapperService);
      getConfig.next({});

      service.refreshToken();

      expect(oAuthService.refreshToken).toHaveBeenCalled();
    });
  });

  describe('revokeAndLogout()', () => {
    describe('when dynamicAuthConfig is enabled', () => {
      beforeEach(() => {
        featureToggles.dynamicAuthConfiguration = true;
      });

      it('should wait to call revokeTokenAndLogout until the oauth service is configured', async () => {
        const getConfig = new ReplaySubject<AuthConfig>(1);
        spyOn(dynamicAuthConfigService, 'getConfig').and.returnValue(
          getConfig.asObservable()
        );
        spyOn(oAuthService, 'revokeTokenAndLogout').and.callThrough();
        service = TestBed.inject(OAuthLibWrapperService);

        const actual = service.revokeAndLogout();

        expect(oAuthService.revokeTokenAndLogout).not.toHaveBeenCalled();

        getConfig.next({});
        await actual;

        expect(oAuthService.revokeTokenAndLogout).toHaveBeenCalled();
      });
    });

    it('should call revokeTokenAndLogout method from the lib', async () => {
      spyOn(oAuthService, 'revokeTokenAndLogout').and.callThrough();
      spyOn(oAuthService, 'logOut').and.callThrough();
      service = TestBed.inject(OAuthLibWrapperService);

      await service.revokeAndLogout();

      expect(oAuthService.revokeTokenAndLogout).toHaveBeenCalled();
      expect(oAuthService.logOut).not.toHaveBeenCalled();
    });

    it('should call logOut method from the lib when the revoke fails', async () => {
      spyOn(oAuthService, 'logOut').and.callThrough();
      spyOn(oAuthService, 'revokeTokenAndLogout').and.returnValue(
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
      spyOn(oAuthService, 'logOut').and.callThrough();

      service.logout();

      expect(oAuthService.logOut).toHaveBeenCalled();
    });
  });

  describe('getIdToken()', () => {
    beforeEach(() => {
      service = TestBed.inject(OAuthLibWrapperService);
    });

    it('should return the result from the getIdToken method from lib', () => {
      spyOn(oAuthService, 'getIdToken').and.returnValue('id_tok');

      const token = service.getIdToken();
      expect(token).toEqual('id_tok');
    });
  });

  describe('initLoginFlow()', () => {
    describe('when dynamicAuthConfig is enabled', () => {
      beforeEach(() => {
        featureToggles.dynamicAuthConfiguration = true;
      });

      it('should wait to call initLoginFlow until the oauth service is configured', async () => {
        const getConfig = new ReplaySubject<AuthConfig>(1);
        spyOn(dynamicAuthConfigService, 'getConfig').and.returnValue(
          getConfig.asObservable()
        );
        spyOn(oAuthService, 'initLoginFlow').and.callThrough();
        service = TestBed.inject(OAuthLibWrapperService);

        const actual = service.initLoginFlow();

        expect(oAuthService.initLoginFlow).not.toHaveBeenCalled();

        getConfig.next({});
        await actual;

        expect(oAuthService.initLoginFlow).toHaveBeenCalled();
      });
    });

    it('should call initLoginFlow from the lib', () => {
      spyOn(oAuthService, 'initLoginFlow').and.callThrough();
      service = TestBed.inject(OAuthLibWrapperService);

      service.initLoginFlow();

      expect(oAuthService.initLoginFlow).toHaveBeenCalled();
    });

    it('should not set oAuth flow key in local storage when authorizationCodeFlowByDefault is enabled', () => {
      featureToggles.authorizationCodeFlowByDefault = true;
      spyOn(winRef.localStorage as Storage, 'setItem').and.callThrough();
      service = TestBed.inject(OAuthLibWrapperService);

      service.initLoginFlow();

      expect(winRef.localStorage?.setItem).not.toHaveBeenCalled();
    });

    it('should set oAuth flow key in local storage when authorizationCodeFlowByDefault is disabled', () => {
      featureToggles.authorizationCodeFlowByDefault = false;
      spyOn(winRef.localStorage as Storage, 'setItem').and.callThrough();
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
        spyOn(winRef.localStorage as Storage, 'setItem').and.callThrough();
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
      spyOn(winRef.localStorage as Storage, 'removeItem').and.callThrough();
    });

    describe('when dynamicAuthConfig is enabled', () => {
      beforeEach(() => {
        featureToggles.dynamicAuthConfiguration = true;
      });

      it('should wait to call tryLogin until the oauth service is configured', fakeAsync(() => {
        const getConfig = new ReplaySubject<AuthConfig>(1);
        spyOn(dynamicAuthConfigService, 'getConfig').and.returnValue(
          getConfig.asObservable()
        );
        spyOn(oAuthService, 'tryLogin').and.callThrough();
        service = TestBed.inject(OAuthLibWrapperService);
        service.events$ = new BehaviorSubject<OAuthEvent>({
          type: 'token_received',
        });

        service.tryLogin();
        tick();

        expect(oAuthService.tryLogin).not.toHaveBeenCalled();

        getConfig.next({});
        tick();

        expect(oAuthService.tryLogin).toHaveBeenCalled();
      }));
    });

    it('should call tryLogin method from the lib', () => {
      spyOn(oAuthService, 'tryLogin').and.callThrough();
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
      spyOn(oAuthService, 'tryLogin').and.returnValue(Promise.reject(error));
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
      const initializeSpy = spyOn(service as any, 'initialize');
      service.refreshAuthConfig();
      expect(initializeSpy).toHaveBeenCalled();
    });
  });

  describe('changeAuthConfigClientId()', () => {
    beforeEach(() => {
      service = TestBed.inject(OAuthLibWrapperService);
    });

    it('should call changeClientWhenInitialize method', () => {
      const initializeSpy = spyOn(service as any, 'changeClientWhenInitialize');
      service.changeAuthConfigClientId('testClientId');
      expect(initializeSpy).toHaveBeenCalled();
    });
  });
});
