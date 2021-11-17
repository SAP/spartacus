import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthActions,
  AuthService,
  AuthToken,
  OAuthLibWrapperService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { TokenResponse } from 'angular-oauth2-oidc';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsmState, ASM_FEATURE } from '../../core/store/asm-state';
import * as fromReducers from '../../core/store/reducers/index';
import {
  AsmAuthStorageService,
  TokenTarget,
} from '../services/asm-auth-storage.service';
import { CsAgentAuthService } from './csagent-auth.service';

class MockAuthService implements Partial<AuthService> {
  logout() {}
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  authorizeWithPasswordFlow() {
    return Promise.resolve({} as TokenResponse);
  }
  revokeAndLogout() {
    return Promise.resolve();
  }
}

class MockUserService implements Partial<UserService> {
  get() {
    return of({});
  }
}

describe('CsAgentAuthService', () => {
  let service: CsAgentAuthService;
  let store: Store<AsmState>;
  let userIdService: UserIdService;
  let authService: AuthService;
  let asmAuthStorageService: AsmAuthStorageService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        AsmAuthStorageService,
        UserIdService,
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: UserService, useClass: MockUserService },
      ],
    });

    service = TestBed.inject(CsAgentAuthService);
    userIdService = TestBed.inject(UserIdService);
    authService = TestBed.inject(AuthService);
    asmAuthStorageService = TestBed.inject(AsmAuthStorageService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    userService = TestBed.inject(UserService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authorizeCustomerSupportAgent()', () => {
    it('should only login cs agent when there is not any active session', async () => {
      spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      ).and.callThrough();
      spyOn(store, 'dispatch').and.callFake(() => {});
      spyOn(userIdService, 'setUserId').and.callThrough();
      spyOn(asmAuthStorageService, 'clearEmulatedUserToken').and.callThrough();

      await service.authorizeCustomerSupportAgent('testUser', 'testPass');

      let tokenTarget;
      asmAuthStorageService
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((target) => (tokenTarget = target));

      expect(
        oAuthLibWrapperService.authorizeWithPasswordFlow
      ).toHaveBeenCalledWith('testUser', 'testPass');
      expect(tokenTarget).toBe(TokenTarget.CSAgent);
      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
      expect(userIdService.setUserId).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS
      );
      expect(asmAuthStorageService.clearEmulatedUserToken).toHaveBeenCalled();
    });

    it('when there was logged in user, should login CS agent and start emulation for that user', async () => {
      const dispatch = spyOn(store, 'dispatch').and.callFake(() => {});
      spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      ).and.callThrough();
      spyOn(userIdService, 'setUserId').and.callThrough();
      spyOn(asmAuthStorageService, 'setEmulatedUserToken').and.callThrough();
      spyOn(userService, 'get').and.returnValue(of({ customerId: 'custId' }));
      asmAuthStorageService.setToken({ access_token: 'token' } as AuthToken);

      await service.authorizeCustomerSupportAgent('testUser', 'testPass');

      let tokenTarget;
      asmAuthStorageService
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((target) => (tokenTarget = target));

      expect(
        oAuthLibWrapperService.authorizeWithPasswordFlow
      ).toHaveBeenCalledWith('testUser', 'testPass');
      expect(tokenTarget).toBe(TokenTarget.CSAgent);
      expect(dispatch.calls.argsFor(0)[0]).toEqual(new AuthActions.Logout());
      expect(dispatch.calls.argsFor(1)[0]).toEqual(new AuthActions.Login());

      expect(userIdService.setUserId).toHaveBeenCalledWith('custId');
      expect(asmAuthStorageService.setEmulatedUserToken).toHaveBeenCalledWith({
        access_token: 'token',
      } as AuthToken);
    });

    it('should not changed storage state, when authorization failed', async () => {
      spyOn(store, 'dispatch').and.callFake(() => {});
      spyOn(oAuthLibWrapperService, 'authorizeWithPasswordFlow').and.callFake(
        () => {
          return Promise.reject();
        }
      );
      spyOn(userIdService, 'setUserId').and.callThrough();
      spyOn(asmAuthStorageService, 'setEmulatedUserToken').and.callThrough();
      spyOn(asmAuthStorageService, 'clearEmulatedUserToken').and.callThrough();

      await service.authorizeCustomerSupportAgent('testUser', 'testPass');

      let tokenTarget;
      asmAuthStorageService
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((target) => (tokenTarget = target));

      expect(
        oAuthLibWrapperService.authorizeWithPasswordFlow
      ).toHaveBeenCalledWith('testUser', 'testPass');
      expect(tokenTarget).toBe(TokenTarget.User);
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(userIdService.setUserId).not.toHaveBeenCalled();
      expect(asmAuthStorageService.setEmulatedUserToken).not.toHaveBeenCalled();
      expect(
        asmAuthStorageService.clearEmulatedUserToken
      ).not.toHaveBeenCalled();
    });
  });

  describe('startCustomerEmulationSession()', () => {
    it('should start emulation of a customer', () => {
      const dispatch = spyOn(store, 'dispatch').and.callFake(() => {});
      spyOn(asmAuthStorageService, 'clearEmulatedUserToken').and.callThrough();
      spyOn(userIdService, 'setUserId').and.callThrough();

      service.startCustomerEmulationSession('custId');

      expect(asmAuthStorageService.clearEmulatedUserToken).toHaveBeenCalled();
      expect(dispatch.calls.argsFor(0)[0]).toEqual(new AuthActions.Logout());
      expect(dispatch.calls.argsFor(1)[0]).toEqual(new AuthActions.Login());
      expect(userIdService.setUserId).toHaveBeenCalledWith('custId');
    });
  });

  describe('isCustomerSupportAgentLoggedIn()', () => {
    it('should emit true when CS agent is logged in', (done) => {
      asmAuthStorageService.switchTokenTargetToCSAgent();
      asmAuthStorageService.setToken({ access_token: 'token' } as AuthToken);

      service
        .isCustomerSupportAgentLoggedIn()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
    });

    it('should emit false when user logged in', (done) => {
      asmAuthStorageService.switchTokenTargetToUser();

      service
        .isCustomerSupportAgentLoggedIn()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
    });

    it('should emit false when no one is logged in', (done) => {
      asmAuthStorageService.setToken(undefined);

      service
        .isCustomerSupportAgentLoggedIn()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
    });
  });

  describe('isCustomerEmulated()', () => {
    it('should emit true when user is emulated', (done) => {
      userIdService.setUserId('cust-id');

      service
        .isCustomerEmulated()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
    });

    it('should emit false when user is not emulated', (done) => {
      userIdService.setUserId(OCC_USER_ID_CURRENT);

      service
        .isCustomerEmulated()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
    });
  });

  // TODO(#8248)
  xdescribe('getCustomerSupportAgentTokenLoading()', () => {});

  describe('logoutCustomerSupportAgent()', () => {
    it('should logout CS agent', async () => {
      const dispatch = spyOn(store, 'dispatch').and.callFake(() => {});
      spyOn(oAuthLibWrapperService, 'revokeAndLogout').and.callThrough();

      await service.logoutCustomerSupportAgent();

      let tokenTarget;
      asmAuthStorageService
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((target) => (tokenTarget = target));

      expect(oAuthLibWrapperService.revokeAndLogout).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: '[Auth] Logout Customer Support Agent',
      });
      expect(tokenTarget).toBe(TokenTarget.User);
    });

    it('should restore previous session when there is old session token', async () => {
      const dispatch = spyOn(store, 'dispatch').and.callFake(() => {});
      spyOn(asmAuthStorageService, 'setToken').and.callThrough();
      spyOn(asmAuthStorageService, 'clearEmulatedUserToken').and.callThrough();
      spyOn(userIdService, 'setUserId').and.callThrough();
      userIdService.setUserId('cust-id');
      asmAuthStorageService.setEmulatedUserToken({
        access_token: 'user_token',
      } as AuthToken);

      await service.logoutCustomerSupportAgent();

      expect(asmAuthStorageService.setToken).toHaveBeenCalledWith({
        access_token: 'user_token',
      } as AuthToken);
      expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
      expect(asmAuthStorageService.clearEmulatedUserToken).toHaveBeenCalled();
      expect(dispatch.calls.argsFor(1)[0]).toEqual(new AuthActions.Logout());
      expect(dispatch.calls.argsFor(2)[0]).toEqual(new AuthActions.Login());
    });

    it('should logout user, when we can not restore old session', async () => {
      spyOn(authService, 'logout').and.callThrough();

      await service.logoutCustomerSupportAgent();

      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
