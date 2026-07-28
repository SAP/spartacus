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
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { TokenResponse } from 'angular-oauth2-oidc';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { ASM_FEATURE, AsmState } from '../../core/store/asm-state';
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

  initLoginFlow() {
    return Promise.resolve({} as TokenResponse);
  }
}

class MockUserAccountFacade implements Partial<UserAccountFacade> {
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
  let userAccountFacade: UserAccountFacade;

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
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    service = TestBed.inject(CsAgentAuthService);
    userIdService = TestBed.inject(UserIdService);
    authService = TestBed.inject(AuthService);
    asmAuthStorageService = TestBed.inject(AsmAuthStorageService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    userAccountFacade = TestBed.inject(UserAccountFacade);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authorizeCustomerSupportAgent()', () => {
    it('should only login cs agent when there is not any active session', async () => {
      vi.spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      );
      vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(asmAuthStorageService, 'clearEmulatedUserToken');

      await service.authorizeCustomerSupportAgent('testUser', 'testPass');

      const tokenTarget = await firstValueFrom(asmAuthStorageService.getTokenTarget());

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
      const dispatch = vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      );
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(asmAuthStorageService, 'setEmulatedUserToken');
      vi.spyOn(userAccountFacade, 'get').mockReturnValue(
        of({ customerId: 'custId' })
      );
      asmAuthStorageService.setToken({ access_token: 'token' } as AuthToken);

      await service.authorizeCustomerSupportAgent('testUser', 'testPass');

      const tokenTarget = await firstValueFrom(asmAuthStorageService.getTokenTarget());

      expect(
        oAuthLibWrapperService.authorizeWithPasswordFlow
      ).toHaveBeenCalledWith('testUser', 'testPass');
      expect(tokenTarget).toBe(TokenTarget.CSAgent);
      expect(vi.mocked(dispatch).mock.calls[0][0]).toEqual(new AuthActions.Logout());
      expect(vi.mocked(dispatch).mock.calls[1][0]).toEqual(new AuthActions.Login());

      expect(userIdService.setUserId).toHaveBeenCalledWith('custId');
      expect(asmAuthStorageService.setEmulatedUserToken).toHaveBeenCalledWith({
        access_token: 'token',
      } as AuthToken);
    });

    it('should not changed storage state, when authorization failed', async () => {
      vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(oAuthLibWrapperService, 'authorizeWithPasswordFlow').mockImplementation(
        () => {
          return Promise.reject();
        }
      );
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(asmAuthStorageService, 'setEmulatedUserToken');
      vi.spyOn(asmAuthStorageService, 'clearEmulatedUserToken');

      await service.authorizeCustomerSupportAgent('testUser', 'testPass');

      const tokenTarget = await firstValueFrom(asmAuthStorageService.getTokenTarget());

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

  describe('authorizeCustomerSupportAgentWhenUseCodeFlow()', () => {
    it('should only login cs agent when there is not any active session', async () => {
      vi.spyOn(oAuthLibWrapperService, 'initLoginFlow');
      vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(asmAuthStorageService, 'clearEmulatedUserToken');

      await service.authorizeCustomerSupportAgentWhenUseCodeFlow();

      const tokenTarget = await firstValueFrom(asmAuthStorageService.getTokenTarget());

      expect(oAuthLibWrapperService.initLoginFlow).toHaveBeenCalled();
      expect(tokenTarget).toBe(TokenTarget.CSAgent);
      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
      expect(userIdService.setUserId).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS
      );
      expect(asmAuthStorageService.clearEmulatedUserToken).toHaveBeenCalled();
    });

    it('when there was logged in user, should login CS agent and start emulation for that user', async () => {
      const dispatch = vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(oAuthLibWrapperService, 'initLoginFlow');
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(asmAuthStorageService, 'setEmulatedUserToken');
      vi.spyOn(userAccountFacade, 'get').mockReturnValue(
        of({ customerId: 'custId' })
      );
      asmAuthStorageService.setToken({ access_token: 'token' } as AuthToken);

      await service.authorizeCustomerSupportAgentWhenUseCodeFlow();

      const tokenTarget = await firstValueFrom(asmAuthStorageService.getTokenTarget());

      expect(oAuthLibWrapperService.initLoginFlow).toHaveBeenCalled();
      expect(tokenTarget).toBe(TokenTarget.CSAgent);
      expect(vi.mocked(dispatch).mock.calls[0][0]).toEqual(new AuthActions.Logout());
      expect(vi.mocked(dispatch).mock.calls[1][0]).toEqual(new AuthActions.Login());

      expect(userIdService.setUserId).toHaveBeenCalledWith('custId');
      expect(asmAuthStorageService.setEmulatedUserToken).toHaveBeenCalledWith({
        access_token: 'token',
      } as AuthToken);
    });

    it('should not changed storage state, when authorization failed', async () => {
      vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(oAuthLibWrapperService, 'initLoginFlow').mockImplementation(() => {
        return Promise.reject();
      });
      vi.spyOn(userIdService, 'setUserId');
      vi.spyOn(asmAuthStorageService, 'setEmulatedUserToken');
      vi.spyOn(asmAuthStorageService, 'clearEmulatedUserToken');

      await service.authorizeCustomerSupportAgentWhenUseCodeFlow();

      const tokenTarget = await firstValueFrom(asmAuthStorageService.getTokenTarget());

      expect(oAuthLibWrapperService.initLoginFlow).toHaveBeenCalled();
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
      const dispatch = vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(asmAuthStorageService, 'clearEmulatedUserToken');
      vi.spyOn(userIdService, 'setUserId');

      service.startCustomerEmulationSession('custId');

      expect(asmAuthStorageService.clearEmulatedUserToken).toHaveBeenCalled();
      expect(vi.mocked(dispatch).mock.calls[0][0]).toEqual(new AuthActions.Logout());
      expect(vi.mocked(dispatch).mock.calls[1][0]).toEqual(new AuthActions.Login());
      expect(userIdService.setUserId).toHaveBeenCalledWith('custId');
    });
  });

  describe('isCustomerSupportAgentLoggedIn()', () => {
    it('should emit true when CS agent is logged in', async () => {
      asmAuthStorageService.switchTokenTargetToCSAgent();
      asmAuthStorageService.setToken({ access_token: 'token' } as AuthToken);

      const result = await firstValueFrom(service.isCustomerSupportAgentLoggedIn());
      expect(result).toBe(true);
    });

    it('should emit false when user logged in', async () => {
      asmAuthStorageService.switchTokenTargetToUser();

      const result = await firstValueFrom(service.isCustomerSupportAgentLoggedIn());
      expect(result).toBe(false);
    });

    it('should emit false when no one is logged in', async () => {
      asmAuthStorageService.setToken(undefined);

      const result = await firstValueFrom(service.isCustomerSupportAgentLoggedIn());
      expect(result).toBe(false);
    });
  });

  describe('isCustomerEmulated()', () => {
    it('should emit true when user is emulated', async () => {
      userIdService.setUserId('cust-id');

      const result = await firstValueFrom(service.isCustomerEmulated());
      expect(result).toBe(true);
    });

    it('should emit false when user is not emulated', async () => {
      userIdService.setUserId(OCC_USER_ID_CURRENT);

      const result = await firstValueFrom(service.isCustomerEmulated());
      expect(result).toBe(false);
    });
  });

  // TODO(#8248)
  // xdescribe('getCustomerSupportAgentTokenLoading()', () => {});

  describe('logoutCustomerSupportAgent()', () => {
    it('should logout CS agent', async () => {
      const dispatch = vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(oAuthLibWrapperService, 'revokeAndLogout');

      await service.logoutCustomerSupportAgent();

      const tokenTarget = await firstValueFrom(asmAuthStorageService.getTokenTarget());

      expect(oAuthLibWrapperService.revokeAndLogout).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: '[Auth] Logout Customer Support Agent',
      });
      expect(tokenTarget).toBe(TokenTarget.User);
    });

    it('should restore previous session when there is old session token', async () => {
      const dispatch = vi.spyOn(store, 'dispatch').mockImplementation(() => null);
      vi.spyOn(asmAuthStorageService, 'setToken');
      vi.spyOn(asmAuthStorageService, 'clearEmulatedUserToken');
      vi.spyOn(userIdService, 'setUserId');
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
      expect(vi.mocked(dispatch).mock.calls[1][0]).toEqual(new AuthActions.Logout());
      expect(vi.mocked(dispatch).mock.calls[2][0]).toEqual(new AuthActions.Login());
    });

    it('should logout user, when we can not restore old session', async () => {
      vi.spyOn(authService, 'logout');

      await service.logoutCustomerSupportAgent();

      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
