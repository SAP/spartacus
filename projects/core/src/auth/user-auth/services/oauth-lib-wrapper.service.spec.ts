import { TestBed } from '@angular/core/testing';
import { FeatureConfigService, FederatedLoginService } from '@spartacus/core';
import { OAuthEvent, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { BehaviorSubject, of } from 'rxjs';
import { WindowRef } from '../../../window';
import { AuthConfigService } from './auth-config.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

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

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled = jasmine.createSpy();
}

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  enabled = false;
  isLoginDomain = false;
  origin: string | undefined = undefined;
  detectContext = jasmine.createSpy();
  getParameters = jasmine.createSpy().and.returnValue(of('context=de:en'));
}

const store = {};
const MockWindowRef = {
  localStorage: {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string): void => {
      if (key in store) {
        store[key] = undefined;
      }
    },
  },
  isBrowser(): boolean {
    return true;
  },
  nativeWindow: {
    location: {
      origin: 'test.com',
    },
  },
};

describe('OAuthLibWrapperService', () => {
  let service: OAuthLibWrapperService;
  let oAuthService: OAuthService;
  let winRef: WindowRef;
  let authConfigService: AuthConfigService;
  let featureConfigService: FeatureConfigService;
  let federatedLoginService: MockFederatedLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OAuthLibWrapperService,
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        { provide: OAuthService, useClass: MockOAuthService },
        { provide: WindowRef, useValue: MockWindowRef },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        {
          provide: FederatedLoginService,
          useClass: MockFederatedLoginService,
        },
      ],
    });
    service = TestBed.inject(OAuthLibWrapperService);
    oAuthService = TestBed.inject(OAuthService);
    winRef = TestBed.inject(WindowRef);
    authConfigService = TestBed.inject(AuthConfigService);
    featureConfigService = TestBed.inject(FeatureConfigService);
    federatedLoginService = TestBed.inject(
      FederatedLoginService
    ) as unknown as MockFederatedLoginService;
  });

  describe('initialize()', () => {
    it('should configure lib with the config', () => {
      spyOn(oAuthService, 'configure').and.callThrough();

      (service as any)['initialize']();

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

      (service as any)['initialize']();

      expect(oAuthService.configure).toHaveBeenCalledWith(
        jasmine.objectContaining({
          redirectUri: 'redUri',
        })
      );
    });

    it('should use current location as a redirectUrl when not explicitly set in browser', () => {
      spyOn(oAuthService, 'configure').and.callThrough();
      spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

      (service as any)['initialize']();

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

      (service as any)['initialize']();

      expect(oAuthService.configure).toHaveBeenCalledWith(
        jasmine.objectContaining({
          redirectUri: '',
        })
      );
    });

    it('should detect federated login context to ensure FederatedLoginService is initialized', () => {
      (service as any)['initialize']();

      expect(federatedLoginService.detectContext).toHaveBeenCalled();
    });

    it('should not subscribe to getParameters when federated login is disabled', () => {
      (service as any)['initialize']();

      expect(federatedLoginService.getParameters).not.toHaveBeenCalled();
    });

    describe('when federated login is enabled', () => {
      beforeEach(() => {
        federatedLoginService.enabled = true;
      });

      it('should re-configure the auth service with federated login context parameters on loginUrl', () => {
        spyOn(oAuthService, 'configure').and.callThrough();
        spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

        (service as any)['initialize']();

        expect(federatedLoginService.getParameters).toHaveBeenCalled();
        expect(oAuthService.configure).toHaveBeenCalledWith(
          jasmine.objectContaining({
            loginUrl: 'login?context=de:en',
          })
        );
      });

      it('should append params with & when loginUrl already has a query string', () => {
        spyOn(oAuthService, 'configure').and.callThrough();
        spyOn(authConfigService, 'getLoginUrl').and.returnValue(
          'login?foo=bar'
        );
        spyOn(authConfigService, 'getOAuthLibConfig').and.returnValue({});

        (service as any)['initialize']();

        expect(oAuthService.configure).toHaveBeenCalledWith(
          jasmine.objectContaining({
            loginUrl: 'login?foo=bar&context=de:en',
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

          (service as any)['initialize']();

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
  });

  describe('refreshToken()', () => {
    it('should call refreshToken method from lib', () => {
      spyOn(oAuthService, 'refreshToken').and.callThrough();

      service.refreshToken();

      expect(oAuthService.refreshToken).toHaveBeenCalled();
    });
  });

  describe('revokeAndLogout()', () => {
    it('should call revokeTokenAndLogout method from the lib', async () => {
      spyOn(oAuthService, 'revokeTokenAndLogout').and.callThrough();
      spyOn(oAuthService, 'logOut').and.callThrough();

      await service.revokeAndLogout();

      expect(oAuthService.revokeTokenAndLogout).toHaveBeenCalled();
      expect(oAuthService.logOut).not.toHaveBeenCalled();
    });

    it('should call logOut method from the lib when the revoke fails', async () => {
      spyOn(oAuthService, 'logOut').and.callThrough();
      spyOn(oAuthService, 'revokeTokenAndLogout').and.returnValue(
        Promise.reject()
      );

      await service.revokeAndLogout();

      expect(oAuthService.revokeTokenAndLogout).toHaveBeenCalled();
      expect(oAuthService.logOut).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('should call logOut method from the lib', () => {
      spyOn(oAuthService, 'logOut').and.callThrough();

      service.logout();

      expect(oAuthService.logOut).toHaveBeenCalled();
    });
  });

  describe('getIdToken()', () => {
    it('should return the result from the getIdToken method from lib', () => {
      spyOn(oAuthService, 'getIdToken').and.returnValue('id_tok');

      const token = service.getIdToken();
      expect(token).toEqual('id_tok');
    });
  });

  describe('initLoginFlow()', () => {
    it('should call initLoginFlow from the lib', () => {
      spyOn(oAuthService, 'initLoginFlow').and.callThrough();

      service.initLoginFlow();

      expect(oAuthService.initLoginFlow).toHaveBeenCalled();
    });

    it('should not set oAuth flow key in local storage when authorizationCodeFlowByDefault is enabled', () => {
      (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(true);
      spyOn(winRef.localStorage as Storage, 'setItem').and.callThrough();
      service.initLoginFlow();

      expect(winRef.localStorage?.setItem).not.toHaveBeenCalled();
      expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
        'authorizationCodeFlowByDefault'
      );
    });

    it('should set oAuth flow key in local storage when authorizationCodeFlowByDefault is disabled', () => {
      (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(false);
      spyOn(winRef.localStorage as Storage, 'setItem').and.callThrough();
      service.initLoginFlow();

      expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
        'oAuthRedirectCodeFlow',
        'true'
      );
      expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
        'authorizationCodeFlowByDefault'
      );
    });

    it('should set oAuth flow key in local storage', () => {
      service.initLoginFlow();

      const storedOauthFlowKey = winRef.localStorage?.getItem(
        'oAuthRedirectCodeFlow'
      );

      expect(storedOauthFlowKey).toBeTruthy();
    });
  });

  describe('tryLogin()', () => {
    beforeEach(() => {
      service.events$ = new BehaviorSubject<OAuthEvent>({
        type: 'token_received',
      });
    });

    it('should call tryLogin method from the lib', () => {
      spyOn(oAuthService, 'tryLogin').and.callThrough();

      service.tryLogin();

      expect(oAuthService.tryLogin).toHaveBeenCalledWith({
        disableOAuth2StateCheck: true,
      });
    });

    it('should return POSTITIVE token received event indication', async () => {
      const result = await service.tryLogin();
      expect(result).toEqual({
        result: true,
        tokenReceived: true,
      });
    });

    it('should return NEGATIVE token received event indication', async () => {
      (service.events$ as BehaviorSubject<OAuthEvent>).next({
        type: 'discovery_document_load_error',
      });
      const result = await service.tryLogin();
      expect(result).toEqual({
        result: true,
        tokenReceived: false,
      });
    });

    it('should reject promise if oAuthService.tryLogin throws an error', async () => {
      const error = new Error('Login failed');

      spyOn(oAuthService, 'tryLogin').and.returnValue(Promise.reject(error));

      try {
        await service.tryLogin();
        fail('Expected tryLogin() to throw');
      } catch (err) {
        expect(err).toEqual(error);
      }

      expect(oAuthService.tryLogin).toHaveBeenCalledWith({
        disableOAuth2StateCheck: true,
      });
    });
  });

  describe('refreshAuthConfig()', () => {
    it('should call initialize method', () => {
      const initializeSpy = spyOn(service as any, 'initialize');
      service.refreshAuthConfig();
      expect(initializeSpy).toHaveBeenCalled();
    });
  });

  describe('changeAuthConfigClientId()', () => {
    it('should call changeClientWhenInitialize method', () => {
      const initializeSpy = spyOn(service as any, 'changeClientWhenInitialize');
      service.changeAuthConfigClientId('testClientId');
      expect(initializeSpy).toHaveBeenCalled();
    });
  });
});
