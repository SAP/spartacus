import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthEventType,
  AuthMultisiteIsolationService,
  AuthNotificationService,
  AuthRedirectService,
  AuthToken,
  CrossSiteRequestForgeryService,
  GlobalMessageService,
  OAuthLibWrapperService,
  PROCESS_FEATURE,
  RoutingService,
  StateWithClientAuth,
  UserIdService,
} from '@spartacus/core';
import { getReducers } from 'core-libs/core/src/process/store/reducers/index';
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
  clearUserId = jasmine.createSpy();
  setUserId = jasmine.createSpy();

  isEmulated = () => isEmulated$.asObservable();
}

class MockOAuthLibWrapperService {
  revokeAndLogout = jasmine.createSpy().and.returnValue(Promise.resolve());
  initLoginFlow = jasmine.createSpy();

  authorizeWithPasswordFlow = () => Promise.resolve();
}

class MockAsmAuthStorageService {
  clearEmulatedUserToken = jasmine.createSpy();

  getToken = () => authToken$.asObservable();
  getTokenTarget = () => tokenTarget$.asObservable();
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

class MockAuthRedirectService {}
class MockRoutingService {}

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
  events$ = new Subject<unknown>();
  sendEvent(_data?: unknown): void {}
}

describe('AsmAuthService', () => {
  let service: AsmAuthService;
  let store: Store<StateWithClientAuth>;
  let userIdService: UserIdService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let asmAuthStorageService: AsmAuthStorageService;
  let globalMessageService: GlobalMessageService;
  let authNotificationService: MockAuthNotificationService;

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
    authNotificationService = TestBed.inject(
      AuthNotificationService
    ) as unknown as MockAuthNotificationService;

    spyOn(store, 'dispatch').and.callThrough();
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
      spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      ).and.callThrough();

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

      expect(result).toBeTrue();
      expect(oAuthLibWrapperService.initLoginFlow).toHaveBeenCalled();
    });

    it('should warn about CS Agent if user cannot login', () => {
      tokenTarget$.next(TokenTarget.CSAgent);

      const result = service.loginWithRedirect();

      expect(result).toBeFalse();
      expect(globalMessageService.add).toHaveBeenCalled();
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

        expect(isLoggedIn).toBeFalse();
      });
    });

    describe('with access_token', () => {
      it('should return true for users', async () => {
        const isLoggedIn = await firstValueFrom(service.isUserLoggedIn());

        expect(isLoggedIn).toBeTrue();
      });

      it('should return true for CSAgents emulating user', async () => {
        tokenTarget$.next(TokenTarget.CSAgent);
        isEmulated$.next(true);

        const isLoggedIn = await firstValueFrom(service.isUserLoggedIn());

        expect(isLoggedIn).toBeTrue();
      });

      it('should return false for CSAgents not emulating user', async () => {
        tokenTarget$.next(TokenTarget.CSAgent);

        const isLoggedIn = await firstValueFrom(service.isUserLoggedIn());

        expect(isLoggedIn).toBeFalse();
      });
    });
  });

  describe('authNotifications', () => {
    beforeEach(() => {
      spyOn(service, 'coreLogout').and.stub();
    });

    it('should call coreLogout when a logout event is received', () => {
      authNotificationService.events$.next(AuthEventType.logout);

      expect(service.coreLogout).toHaveBeenCalled();
    });

    it('should not call coreLogout when a logout is in-progress', () => {
      service.setLogoutProgress(true);

      authNotificationService.events$.next(AuthEventType.logout);

      expect(service.coreLogout).not.toHaveBeenCalled();
    });

    it('should not call coreLogout when isUserLoggedIn is false', () => {
      const newToken = { ...authToken };
      delete newToken['access_token'];
      authToken$.next(newToken);

      authNotificationService.events$.next(AuthEventType.logout);

      expect(service.coreLogout).not.toHaveBeenCalled();
    });

    it('should not call coreLogout when a different event is received', () => {
      authNotificationService.events$.next('UNKNOWN_EVENT');

      expect(service.coreLogout).not.toHaveBeenCalled();
    });
  });
});
