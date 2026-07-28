import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthActions,
  AuthMultisiteIsolationService,
  AuthNotificationService,
  AuthNotificationType,
  AuthRedirectService,
  AuthToken,
  CrossSiteRequestForgeryService,
  GlobalMessageService,
  OAuthLibWrapperService,
  OCC_USER_ID_ANONYMOUS,
  PROCESS_FEATURE,
  RoutingService,
  StateWithClientAuth,
  UserIdService,
} from '@spartacus/core';
import { getReducers } from '../../../../core-libs/core/src/process/store/reducers/index';
import { BehaviorSubject, firstValueFrom, Observable, of, Subject } from 'rxjs';
import {
  ASM_FEATURE,
  getReducers as getAsmReducers,
} from '../../core/store/index';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';
import { AsmAuthService } from './asm-auth.service';

const authToken: AuthToken = {
  access_token: 'test_access_token',
  refresh_token: 'test_refresh_token',
  expires_at: 'test_expires',
  granted_scopes: ['scope1', 'scope2'],
  access_token_stored_at: 'test_token_stored_at',
};
const loginInfo = {
  userId: 'testUser',
  password: 'password123',
};

let isEmulated$: BehaviorSubject<boolean>;
let tokenTarget$: BehaviorSubject<TokenTarget>;
let authToken$: BehaviorSubject<AuthToken>;

class MockAuthMultisiteIsolationService
  implements Partial<AuthMultisiteIsolationService>
{
  decorateUserId(userId: string): Observable<string> {
    return of(userId);
  }
}

class MockUserIdService {
  clearUserId = vi.fn();
  setUserId = vi.fn();

  isEmulated = () => isEmulated$.asObservable();
}

class MockOAuthLibWrapperService {
  revokeAndLogout = vi.fn().mockReturnValue(Promise.resolve());
  initLoginFlow = vi.fn();
  tryLogin = vi
    .fn()
    .mockReturnValue(Promise.resolve({ result: true, tokenReceived: false }));

  authorizeWithPasswordFlow = () => Promise.resolve();
}

class MockAsmAuthStorageService {
  clearEmulatedUserToken = vi.fn();
  switchTokenTargetToCSAgent = vi.fn();
  getItem = vi.fn().mockReturnValue(null);

  getToken = () => authToken$.asObservable();
  getTokenTarget = () => tokenTarget$.asObservable();
}

class MockGlobalMessageService {
  add = vi.fn();
}

class MockAuthRedirectService {
  redirect = vi.fn();
}
class MockRoutingService {
  go = vi.fn();
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

class MockAuthNotificationService implements Partial<AuthNotificationService> {
  notifications$ = new Subject<AuthNotificationType>();
  sendNotification(_data: AuthNotificationType): void {}
}

describe('AsmAuthService', () => {
  let service: AsmAuthService;
  let store: Store<StateWithClientAuth>;
  let userIdService: UserIdService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let asmAuthStorageService: AsmAuthStorageService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, getAsmReducers()),
        StoreModule.forFeature(PROCESS_FEATURE, getReducers()),
      ],
      providers: [
        AsmAuthService,
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: AsmAuthStorageService, useClass: MockAsmAuthStorageService },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: AuthMultisiteIsolationService,
          useClass: MockAuthMultisiteIsolationService,
        },
        {
          provide: CrossSiteRequestForgeryService,
          useClass: MockCrossSiteRequestForgeryService,
        },
        {
          provide: AuthNotificationService,
          useClass: MockAuthNotificationService,
        },
      ],
    });

    service = TestBed.inject(AsmAuthService);
    store = TestBed.inject(Store);
    userIdService = TestBed.inject(UserIdService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    asmAuthStorageService = TestBed.inject(AsmAuthStorageService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    vi.spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    isEmulated$ = new BehaviorSubject(false);
    tokenTarget$ = new BehaviorSubject(TokenTarget.User);
    authToken$ = new BehaviorSubject(authToken);
  });

  it('should be injected', inject(
    [AsmAuthService],
    (asmAuthService: AsmAuthService) => {
      expect(asmAuthService).toBeTruthy();
    }
  ));

  describe('loginWithCredentials()', () => {
    it('should authorize if user can login', async () => {
      vi.spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      );

      await service.loginWithCredentials(loginInfo.userId, loginInfo.password);

      expect(
        oAuthLibWrapperService.authorizeWithPasswordFlow
      ).toHaveBeenCalledWith(loginInfo.userId, loginInfo.password);
    });

    it('should warn about CS Agent if user cannot login', () => {
      tokenTarget$.next(TokenTarget.CSAgent);

      service.loginWithCredentials(loginInfo.userId, loginInfo.password);

      expect(globalMessageService.add).toHaveBeenCalled();
    });
  });

  describe('loginWithRedirect()', () => {
    it('should login and redirect if user can login', () => {
      const result = service.loginWithRedirect();

      expect(result).toBe(true);
      expect(oAuthLibWrapperService.initLoginFlow).toHaveBeenCalled();
    });

    it('should redirect to homepage when CS Agent is already logged in but not emulating', () => {
      // CS Agent active: token present + tokenTarget=CSAgent.
      // Guards like CheckoutAuthGuard would route through /login here; we
      // send the user home instead of showing "Cannot login as user".
      tokenTarget$.next(TokenTarget.CSAgent);
      const routingService = TestBed.inject(RoutingService);

      const result = service.loginWithRedirect();

      expect(result).toBe(true);
      expect(routingService.go).toHaveBeenCalledWith('/');
      expect(oAuthLibWrapperService.initLoginFlow).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });

  describe('coreLogout()', () => {
    it('should logout when user not emulated', () => {
      service.coreLogout();

      expect(userIdService.clearUserId).toHaveBeenCalled();
      expect(oAuthLibWrapperService.revokeAndLogout).toHaveBeenCalled();
    });

    it('should logout when emulating user', async () => {
      isEmulated$.next(true);

      await service.coreLogout();

      expect(asmAuthStorageService.clearEmulatedUserToken).toHaveBeenCalled();
      expect(userIdService.clearUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('isUserLoggedIn()', () => {
    describe('without access_token', () => {
      it('should return false', async () => {
        const newToken = { ...authToken };
        delete newToken['access_token'];
        authToken$ = new BehaviorSubject(newToken);

        const isLoggedIn = await firstValueFrom(service.isUserLoggedIn());

        expect(isLoggedIn).toBe(false);
      });
    });

    describe('with access_token', () => {
      it('should return true for users', async () => {
        const isLoggedIn = await firstValueFrom(service.isUserLoggedIn());

        expect(isLoggedIn).toBe(true);
      });

      it('should return true for CSAgents emulating user', async () => {
        tokenTarget$.next(TokenTarget.CSAgent);
        isEmulated$.next(true);

        const isLoggedIn = await firstValueFrom(service.isUserLoggedIn());

        expect(isLoggedIn).toBe(true);
      });

      it('should return false for CSAgents not emulating user', async () => {
        tokenTarget$.next(TokenTarget.CSAgent);

        const isLoggedIn = await firstValueFrom(service.isUserLoggedIn());

        expect(isLoggedIn).toBe(false);
      });
    });
  });

  describe('checkOAuthParamsInUrl()', () => {
    let authRedirectService: AuthRedirectService;

    /** Stubs the tryLogin() promise result. */
    const stubTryLogin = (tokenReceived: boolean) =>
      (oAuthLibWrapperService.tryLogin as any).mockReturnValue(
        Promise.resolve({ result: true, tokenReceived })
      );

    /** Stubs the value returned by authStorageService.getItem('access_token'). */
    const stubStoredAccessToken = (value: string | null) =>
      (asmAuthStorageService.getItem as any).mockReturnValue(value);

    beforeEach(() => {
      authRedirectService = TestBed.inject(AuthRedirectService);
    });

    it('should delegate to parent when not using ASM client', async () => {
      vi.spyOn(service, 'isUsingASMClient').mockReturnValue(of(false));
      const parentSpy = vi.spyOn(
        Object.getPrototypeOf(Object.getPrototypeOf(service)),
        'checkOAuthParamsInUrl'
      ).mockReturnValue(Promise.resolve());

      await service.checkOAuthParamsInUrl();

      expect(parentSpy).toHaveBeenCalled();
    });

    describe('when using ASM client', () => {
      beforeEach(() => {
        vi.spyOn(service, 'isUsingASMClient').mockReturnValue(of(true));
      });

      it('should set CS Agent token target, dispatch Login and redirect when returning from auth server', async () => {
        stubTryLogin(true);
        stubStoredAccessToken('access_token_value');

        await service.checkOAuthParamsInUrl();

        expect(
          asmAuthStorageService.switchTokenTargetToCSAgent
        ).toHaveBeenCalled();
        expect(userIdService.setUserId).toHaveBeenCalledWith(
          OCC_USER_ID_ANONYMOUS
        );
        expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());
        expect(authRedirectService.redirect).toHaveBeenCalled();
      });

      it('should NOT complete login when token was not received (e.g. page refresh)', async () => {
        stubTryLogin(false);
        stubStoredAccessToken('access_token_value');

        await service.checkOAuthParamsInUrl();

        expect(
          asmAuthStorageService.switchTokenTargetToCSAgent
        ).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalledWith(
          new AuthActions.Login()
        );
        expect(authRedirectService.redirect).not.toHaveBeenCalled();
      });

      it('should NOT complete login when no access token is stored', async () => {
        stubTryLogin(true);
        stubStoredAccessToken(null);

        await service.checkOAuthParamsInUrl();

        expect(
          asmAuthStorageService.switchTokenTargetToCSAgent
        ).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalledWith(
          new AuthActions.Login()
        );
        expect(authRedirectService.redirect).not.toHaveBeenCalled();
      });

      it('should swallow errors thrown by tryLogin()', async () => {
        (oAuthLibWrapperService.tryLogin as any).mockReturnValue(
          Promise.reject(new Error('oauth failure'))
        );

        await expect(service.checkOAuthParamsInUrl()).resolves.not.toThrow();

        expect(
          asmAuthStorageService.switchTokenTargetToCSAgent
        ).not.toHaveBeenCalled();
        expect(authRedirectService.redirect).not.toHaveBeenCalled();
      });
    });
  });
});
