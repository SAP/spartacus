import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  CrossSiteRequestForgeryService,
  FeatureToggles,
} from '@spartacus/core';
import { OAuthEvent, TokenResponse } from 'angular-oauth2-oidc';
import { BehaviorSubject, firstValueFrom, Observable, of, Subject } from 'rxjs';
import { Mock, vi } from 'vitest';
import { OCC_USER_ID_CURRENT } from '../../../occ';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthNotificationType } from '../models/auth-notification.model';
import { AuthToken } from '../models/auth-token.model';
import { AuthMultisiteIsolationService } from '../services/auth-multisite-isolation.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { OAuthLibWrapperService } from '../services/oauth-lib-wrapper.service';
import { AuthActions } from '../store/actions';
import { AuthNotificationService } from './auth-notification.service';
import { AuthService } from './auth.service';
import { UserIdService } from './user-id.service';

class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of('');
  }
  clearUserId() {}
  setUserId() {}
  isEmulated(): Observable<boolean> {
    return of();
  }
}

const oauthLibEvents = new BehaviorSubject<OAuthEvent>({
  type: 'token_received',
});
class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  revokeAndLogout() {
    return Promise.resolve();
  }
  authorizeWithPasswordFlow() {
    return Promise.resolve({} as TokenResponse);
  }
  initLoginFlow() {}
  tryLogin() {
    return Promise.resolve({ result: true, tokenReceived: true });
  }
  events$ = oauthLibEvents;
  refreshAuthConfig: Mock = vi.fn();
  changeAuthConfigClientId: Mock = vi.fn();
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return of({ access_token: 'token' } as AuthToken);
  }
  getItem() {
    return 'value';
  }
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  redirect() {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockCrossSiteRequestForgeryService
  implements Partial<CrossSiteRequestForgeryService>
{
  getCsrfToken() {
    return of({
      headerName: 'CSFR',
      parameterName: '_csfr',
      token: 'token',
    });
  }
}

class MockAuthMultisiteIsolationService {
  getBaseSiteDecorator(): Observable<string> {
    return of('');
  }
  decorateUserId(): Observable<string> {
    return of('username');
  }
}

const mockFeatureToggles: FeatureToggles = {
  authorizationCodeFlowByDefault: false,
  dispatchLoginActionOnlyWhenTokenReceived: false,
  propagateLogoutToAllTabs: false,
};

class MockAuthNotificationService implements Partial<AuthNotificationService> {
  notifications$ = new Subject<AuthNotificationType>();
  sendNotification(_data: AuthNotificationType): void {}
}

describe('AuthService', () => {
  let service: AuthService;
  let routingService: RoutingService;
  let authStorageService: AuthStorageService;
  let userIdService: UserIdService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let authRedirectService: AuthRedirectService;
  let authMultisiteIsolationService: AuthMultisiteIsolationService;
  let featureToggles: FeatureToggles;
  let store: Store;
  let authNotificationService: MockAuthNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        AuthService,
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: AuthMultisiteIsolationService,
          useClass: MockAuthMultisiteIsolationService,
        },
        {
          provide: CrossSiteRequestForgeryService,
          useClass: MockCrossSiteRequestForgeryService,
        },
        { provide: FeatureToggles, useValue: { ...mockFeatureToggles } },
        {
          provide: AuthNotificationService,
          useClass: MockAuthNotificationService,
        },
      ],
    });

    service = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    authStorageService = TestBed.inject(AuthStorageService);
    userIdService = TestBed.inject(UserIdService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    authMultisiteIsolationService = TestBed.inject(AuthMultisiteIsolationService);
    featureToggles = TestBed.inject(FeatureToggles);
    store = TestBed.inject(Store);
    authNotificationService = TestBed.inject(
      AuthNotificationService
    ) as unknown as MockAuthNotificationService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkOAuthParamsInUrl()', () => {
    describe('when dispatchLoginActionOnlyWhenTokenReceived feature flag is DISABLED', () => {
      beforeEach(() => {
        featureToggles.dispatchLoginActionOnlyWhenTokenReceived = false;
        service.updateIsUsingASMClient(false);
      });

      it('should login user when token is present and dispatch login action', async () => {
        vi.spyOn(oAuthLibWrapperService, 'tryLogin');
        vi.spyOn(userIdService, 'setUserId');
        vi.spyOn(store, 'dispatch');
        vi.spyOn(authStorageService, 'getItem').mockReturnValue('token');
        vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(false));

        await service.checkOAuthParamsInUrl();

        expect(oAuthLibWrapperService.tryLogin).toHaveBeenCalled();
        expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
        expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
      });

      it('when customer emulated in asm page', async () => {
        vi.spyOn(authStorageService, 'getItem').mockReturnValue('token');
        vi.spyOn(userIdService, 'setUserId');
        vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(true));

        await service.checkOAuthParamsInUrl();

        expect(userIdService.setUserId).not.toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      });

      it('when token is present and customer is not emulated in ASM mode', async () => {
        service.updateIsUsingASMClient(true);
        vi.spyOn(authStorageService, 'getItem').mockReturnValue('token');
        vi.spyOn(userIdService, 'setUserId');
        vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(false));

        await service.checkOAuthParamsInUrl();

        expect(userIdService.setUserId).not.toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      });

      describe('when the token is received', () => {
        it('should redirect', async () => {
          vi.spyOn(authRedirectService, 'redirect');
          vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(false));

          await service.checkOAuthParamsInUrl();

          expect(authRedirectService.redirect).toHaveBeenCalled();
        });

        it('should dispatch login action', async () => {
          vi.spyOn(store, 'dispatch');
          vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(false));

          await service.checkOAuthParamsInUrl();

          expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
        });
      });

      describe('when the token is NOT received', () => {
        beforeEach(() => {
          vi.spyOn(oAuthLibWrapperService, 'tryLogin').mockReturnValue(
            Promise.resolve({ result: true, tokenReceived: false })
          );
          vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(false));
        });

        it('should NOT redirect', async () => {
          vi.spyOn(authRedirectService, 'redirect').mockImplementation(() => {});

          await service.checkOAuthParamsInUrl();

          expect(authRedirectService.redirect).not.toHaveBeenCalled();
        });

        it('should dispatch login action', async () => {
          vi.spyOn(store, 'dispatch');

          await service.checkOAuthParamsInUrl();

          expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
        });
      });
    });

    describe('when dispatchLoginActionOnlyWhenTokenReceived feature flag is ENABLED', () => {
      beforeEach(() => {
        featureToggles.dispatchLoginActionOnlyWhenTokenReceived = true;
      });

      it('when customer emulated in asm page', async () => {
        vi.spyOn(authStorageService, 'getItem').mockReturnValue('token');
        vi.spyOn(userIdService, 'setUserId');
        vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(true));

        await service.checkOAuthParamsInUrl();

        expect(userIdService.setUserId).not.toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      });

      describe('when the token is received', () => {
        beforeEach(() => {
          vi.spyOn(userIdService, 'isEmulated').mockReturnValue(of(false));
        });

        it('should login user and dispatch login action', async () => {
          vi.spyOn(oAuthLibWrapperService, 'tryLogin');
          vi.spyOn(userIdService, 'setUserId');
          vi.spyOn(store, 'dispatch');
          vi.spyOn(authStorageService, 'getItem').mockReturnValue('token');

          await service.checkOAuthParamsInUrl();

          expect(oAuthLibWrapperService.tryLogin).toHaveBeenCalled();
          expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
          expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
        });

        it('should redirect', async () => {
          vi.spyOn(authRedirectService, 'redirect');

          await service.checkOAuthParamsInUrl();

          expect(authRedirectService.redirect).toHaveBeenCalled();
        });
      });

      describe('when the token is NOT received', () => {
        beforeEach(() => {
          vi.spyOn(oAuthLibWrapperService, 'tryLogin').mockReturnValue(
            Promise.resolve({ result: true, tokenReceived: false })
          );
        });

        it('should NOT redirect', async () => {
          vi.spyOn(authRedirectService, 'redirect').mockImplementation(() => {});

          await service.checkOAuthParamsInUrl();

          expect(authRedirectService.redirect).not.toHaveBeenCalled();
        });

        it('should NOT dispatch login action', async () => {
          vi.spyOn(store, 'dispatch');

          await service.checkOAuthParamsInUrl();

          expect(store.dispatch).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('loginWithRedirect()', () => {
    it('should initialize login flow', () => {
      vi.spyOn(oAuthLibWrapperService, 'initLoginFlow');

      const result = service.loginWithRedirect();

      expect(result).toBe(true);
      expect(oAuthLibWrapperService.initLoginFlow).toHaveBeenCalled();
    });
  });

  describe('loginWithCredentials()', () => {
    it('should login user', async () => {
      vi.spyOn(oAuthLibWrapperService, 'authorizeWithPasswordFlow');
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(authRedirectService, 'redirect');
      vi.spyOn(store, 'dispatch');
      vi.spyOn(authMultisiteIsolationService, 'decorateUserId');

      await service.loginWithCredentials('username', 'pass');

      expect(oAuthLibWrapperService.authorizeWithPasswordFlow).toHaveBeenCalledWith('username', 'pass');
      expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });
  });

  describe('otpLoginWithCredentials()', () => {
    it('should login user', async () => {
      vi.spyOn(oAuthLibWrapperService, 'authorizeWithPasswordFlow');
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(authRedirectService, 'redirect');
      vi.spyOn(store, 'dispatch');

      const tokenId = '<LGN[OZ8Ijx92S7pf3KcqtuUxOvM0l2XmZQX+4TUEzXcJyjI=]>';
      const tokenCode = 'XD2iuP';

      await service.otpLoginWithCredentials(tokenId, tokenCode);

      expect(oAuthLibWrapperService.authorizeWithPasswordFlow).toHaveBeenCalledWith(tokenId, tokenCode);
      expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });
  });

  describe('coreLogout()', () => {
    it('should revoke tokens and logout', async () => {
      vi.useFakeTimers();
      vi.spyOn(userIdService, 'clearUserId');
      vi.spyOn(oAuthLibWrapperService, 'revokeAndLogout').mockImplementation(() => {
        return new Promise<void>((resolve) => {
          setTimeout(() => { resolve(); }, 100);
        });
      });
      vi.spyOn(store, 'dispatch');
      vi.spyOn(authNotificationService, 'sendNotification');

      const logoutPromise = service.coreLogout();
      expect(userIdService.clearUserId).toHaveBeenCalled();
      expect(oAuthLibWrapperService.revokeAndLogout).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(
        (service.logoutInProgress$ as BehaviorSubject<boolean>).value
      ).toBe(true);

      await vi.advanceTimersByTimeAsync(100);
      await logoutPromise;

      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
      expect(
        (service.logoutInProgress$ as BehaviorSubject<boolean>).value
      ).toBe(false);
      vi.useRealTimers();
    });

    describe('when propagateLogoutToAllTabs is enabled', () => {
      beforeEach(() => {
        featureToggles.propagateLogoutToAllTabs = true;
      });

      it('should send a logout notification to other tabs', async () => {
        vi.spyOn(userIdService, 'clearUserId');
        vi.spyOn(oAuthLibWrapperService, 'revokeAndLogout').mockImplementation(() => {
          return new Promise<void>((resolve) => {
            setTimeout(() => { resolve(); }, 100);
          });
        });
        vi.spyOn(store, 'dispatch');
        vi.spyOn(authNotificationService, 'sendNotification');

        await service.coreLogout();

        expect(authNotificationService.sendNotification).toHaveBeenCalledWith(
          AuthNotificationType.LOGOUT
        );
      });
    });
  });

  describe('authNotifications', () => {
    beforeEach(() => {
      TestBed.resetTestingModule().configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          AuthService,
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
          {
            provide: OAuthLibWrapperService,
            useClass: MockOAuthLibWrapperService,
          },
          { provide: AuthStorageService, useClass: MockAuthStorageService },
          { provide: AuthRedirectService, useClass: MockAuthRedirectService },
          { provide: RoutingService, useClass: MockRoutingService },
          {
            provide: AuthMultisiteIsolationService,
            useClass: MockAuthMultisiteIsolationService,
          },
          {
            provide: CrossSiteRequestForgeryService,
            useClass: MockCrossSiteRequestForgeryService,
          },
          { provide: FeatureToggles, useValue: { ...mockFeatureToggles } },
          {
            provide: AuthNotificationService,
            useClass: MockAuthNotificationService,
          },
        ],
      });
      authNotificationService = TestBed.inject(
        AuthNotificationService
      ) as unknown as MockAuthNotificationService;
      authStorageService = TestBed.inject(AuthStorageService);
      featureToggles = TestBed.inject(FeatureToggles);
      featureToggles.propagateLogoutToAllTabs = true;

      service = TestBed.inject(AuthService);
      vi.spyOn(service, 'coreLogout').mockImplementation(() => Promise.resolve());
    });

    it('should call coreLogout when a logout event is received', () => {
      authNotificationService.notifications$.next(AuthNotificationType.LOGOUT);

      expect(service.coreLogout).toHaveBeenCalled();
    });

    it('should not call coreLogout when a logout is in-progress', () => {
      service.setLogoutProgress(true);

      authNotificationService.notifications$.next(AuthNotificationType.LOGOUT);

      expect(service.coreLogout).not.toHaveBeenCalled();
    });

    it('should not call coreLogout when isUserLoggedIn is false', () => {
      vi.spyOn(authStorageService, 'getToken').mockReturnValue(of(undefined));

      authNotificationService.notifications$.next(AuthNotificationType.LOGOUT);

      expect(service.coreLogout).not.toHaveBeenCalled();
    });

    it('should not call coreLogout when a different event is received', () => {
      authNotificationService.notifications$.next(
        'UNKNOWN_EVENT' as unknown as AuthNotificationType
      );

      expect(service.coreLogout).not.toHaveBeenCalled();
    });
  });

  describe('isUserLoggedIn()', () => {
    it('should return true when there is access_token', async () => {
      const result = await firstValueFrom(service.isUserLoggedIn());
      expect(result).toBe(true);
    });

    it('should return false when there is not access_token', async () => {
      vi.spyOn(authStorageService, 'getToken').mockReturnValue(of(undefined));
      const result = await firstValueFrom(service.isUserLoggedIn());
      expect(result).toBe(false);
    });
  });

  describe('initLogout()', () => {
    it('should redirect url to logout page', () => {
      vi.spyOn(routingService, 'go');

      service.logout();

      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'logout' });
    });
  });

  describe('refreshAuthConfig()', () => {
    it('should call refreshAuthConfig method', () => {
      (service as any).isAsmEnabled = () => false;
      service.refreshAuthConfig();
      expect(oAuthLibWrapperService.refreshAuthConfig).toHaveBeenCalled();
    });

    describe('authorizationCodeFlowByDefault is enabled', () => {
      beforeEach(() => {
        featureToggles.authorizationCodeFlowByDefault = true;
      });

      it('should call refreshAuthConfig method when asm mode enabled', () => {
        (service as any).isAsmEnabled = () => true;
        service.refreshAuthConfig();
        expect(oAuthLibWrapperService.changeAuthConfigClientId).toHaveBeenCalled();
      });
    });
  });

  describe('isUsingASMClient()', () => {
    it('should return isUsingASMClient$ observable', () => {
      expect(service.isUsingASMClient()).toBe(service['isUsingASMClient$']);
    });
  });

  describe('updateIsUsingASMClient()', () => {
    it('should update isUsingASMClient$ observable value', async () => {
      service.updateIsUsingASMClient(true);
      const value = await firstValueFrom(service.isUsingASMClient());
      expect(value).toBe(true);
    });
  });
});
