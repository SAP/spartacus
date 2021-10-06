import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthRedirectService,
  AuthToken,
  GlobalMessageService,
  OAuthLibWrapperService,
  PROCESS_FEATURE,
  RoutingService,
  StateWithClientAuth,
  UserIdService,
} from '@spartacus/core';
import { getReducers } from 'projects/core/src/process/store/reducers/index';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
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

class MockUserIdService {
  clearUserId = jasmine.createSpy();
  setUserId = jasmine.createSpy();

  isEmulated = () => isEmulated$.asObservable();
}

class MockOAuthLibWrapperService {
  revokeAndLogout = jasmine.createSpy().and.returnValue(Promise.resolve());
  initLoginFlow = jasmine.createSpy();

  authorizeWithPasswordFlow = () => new Promise(() => {});
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
      ],
    });

    service = TestBed.inject(AsmAuthService);
    store = TestBed.inject(Store);
    userIdService = TestBed.inject(UserIdService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    asmAuthStorageService = TestBed.inject(AsmAuthStorageService);
    globalMessageService = TestBed.inject(GlobalMessageService);

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
    it('should authorize if user can login', () => {
      spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      ).and.callThrough();
      service.loginWithCredentials(loginInfo.userId, loginInfo.password);

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

    it('should logout when emulating user', (done: DoneFn) => {
      isEmulated$.next(true);

      service.coreLogout().then(() => {
        expect(asmAuthStorageService.clearEmulatedUserToken).toHaveBeenCalled();
        expect(userIdService.clearUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalled();

        done();
      });
    });
  });

  describe('isUserLoggedIn()', () => {
    describe('without access_token', () => {
      it('should return false', (done: DoneFn) => {
        const newToken = { ...authToken };
        delete newToken['access_token'];

        authToken$ = new BehaviorSubject(newToken);

        service
          .isUserLoggedIn()
          .pipe(take(1))
          .subscribe((isLoggedIn: boolean) => {
            expect(isLoggedIn).toBeFalse();

            done();
          });
      });
    });

    describe('with access_token', () => {
      it('should return true for users', (done: DoneFn) => {
        service
          .isUserLoggedIn()
          .pipe(take(1))
          .subscribe((isLoggedIn: boolean) => {
            expect(isLoggedIn).toBeTrue();

            done();
          });
      });

      it('should return true for CSAgents emulating user', (done: DoneFn) => {
        tokenTarget$.next(TokenTarget.CSAgent);
        isEmulated$.next(true);

        service
          .isUserLoggedIn()
          .pipe(take(1))
          .subscribe((isLoggedIn: boolean) => {
            expect(isLoggedIn).toBeTrue();

            done();
          });
      });

      it('should return false for CSAgents not emulating user', (done: DoneFn) => {
        tokenTarget$.next(TokenTarget.CSAgent);

        service
          .isUserLoggedIn()
          .pipe(take(1))
          .subscribe((isLoggedIn: boolean) => {
            expect(isLoggedIn).toBeFalse();

            done();
          });
      });
    });
  });
});
