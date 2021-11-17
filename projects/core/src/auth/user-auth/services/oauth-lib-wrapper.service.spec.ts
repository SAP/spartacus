import { TestBed } from '@angular/core/testing';
import { OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { WindowRef } from 'projects/core/src/window';
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

describe('OAuthLibWrapperService', () => {
  let service: OAuthLibWrapperService;
  let oAuthService: OAuthService;
  let winRef: WindowRef;
  let authConfigService: AuthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OAuthLibWrapperService,
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        { provide: OAuthService, useClass: MockOAuthService },
      ],
    });
    service = TestBed.inject(OAuthLibWrapperService);
    oAuthService = TestBed.inject(OAuthService);
    winRef = TestBed.inject(WindowRef);
    authConfigService = TestBed.inject(AuthConfigService);
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
  });

  describe('tryLogin()', () => {
    it('should call tryLogin method from the lib', () => {
      spyOn(oAuthService, 'tryLogin').and.callThrough();

      service.tryLogin();

      expect(oAuthService.tryLogin).toHaveBeenCalledWith({
        disableOAuth2StateCheck: true,
      });
    });
  });
});
