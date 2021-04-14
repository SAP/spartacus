import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject, StoreModule } from '@ngrx/store';
import { TokenResponse } from 'angular-oauth2-oidc';
import { UserService } from 'projects/core/src/user/facade/user.service';
import { of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CsAgentAuthService } from '../../../asm/facade/csagent-auth.service';
import {
  AsmAuthStorageService,
  TokenTarget,
} from '../../../asm/services/asm-auth-storage.service';
import { ASM_FEATURE } from '../../../asm/store/asm-state';
import * as fromReducers from '../../../asm/store/reducers/index';
import { EventService } from '../../../event/event.service';
import { User } from '../../../model/misc.model';
import { UserIdService } from '../facade';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { OAuthLibWrapperService } from '../services/oauth-lib-wrapper.service';
import { AuthActions } from '../store/actions';
import { UserAuthEventBuilder } from './user-auth-event.builder';
import { LoginEvent, LogoutEvent } from './user-auth.events';

const anonymousUser = {} as AuthToken;
const authenticatedUser: AuthToken = {
  access_token: '123',
  access_token_stored_at: 'now',
};
const asmUser: AuthToken = {
  access_token: '456',
  access_token_stored_at: 'now',
};

const token$ = new Subject<AuthToken>();
class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn = () =>
    token$.asObservable().pipe(map((token) => !!token.access_token));
  logout = () => token$.next(anonymousUser);
}

class MockAsmAuthStorageService implements Partial<AsmAuthStorageService> {
  setEmulatedUserToken() {}
  getEmulatedUserToken() {
    return authenticatedUser;
  }
  setTokenTarget() {}
  getTokenTarget() {
    return of(TokenTarget.CSAgent);
  }
  getToken() {
    return token$.asObservable();
  }
  setToken(token: AuthToken) {
    return token$.next(token);
  }
  switchTokenTargetToCSAgent() {}
  switchTokenTargetToUser() {}
  clearEmulatedUserToken() {}
}

class MockUserService implements Partial<UserService> {
  get = () => of({} as User);
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  authorizeWithPasswordFlow() {
    return Promise.resolve({} as TokenResponse);
  }
  revokeAndLogout() {
    return Promise.resolve();
  }
}

class MockUserIdService implements Partial<UserIdService> {
  setUserId() {}
  isEmulated() {
    return of(false);
  }
}

describe('UserAuthEventBuilder', () => {
  let actions$: Subject<Action>;
  let eventService: EventService;
  let csAgentAuthService: CsAgentAuthService;
  let userIdService: UserIdService;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: ActionsSubject, useValue: actions$ },
        { provide: AuthService, useClass: MockAuthService },
        { provide: AsmAuthStorageService, useClass: MockAsmAuthStorageService },
        { provide: UserService, useClass: MockUserService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        CsAgentAuthService,
      ],
    });

    TestBed.inject(UserAuthEventBuilder); // register events
    eventService = TestBed.inject(EventService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    userIdService = TestBed.inject(UserIdService);
  });

  describe('LogoutEvent', () => {
    it('should emit a LogoutEvent when a user logs OUT', () => {
      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      token$.next(authenticatedUser);

      token$.next(anonymousUser);

      expect(result).toEqual(new LogoutEvent());
    });

    it('should NOT emit a LogoutEvent when a user logs IN', () => {
      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      token$.next(anonymousUser);

      token$.next(authenticatedUser);

      expect(result).toBeUndefined();
    });

    it('should NOT emit a LogoutEvent when a user STAYS logged IN', () => {
      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      token$.next(authenticatedUser);

      token$.next(authenticatedUser);

      expect(result).toBeUndefined();
    });

    it('should emit ONE LogoutEvent when a user logs OUT', () => {
      let result: LogoutEvent;
      eventService.get(LogoutEvent).subscribe((value) => (result = value));

      token$.next(authenticatedUser);
      token$.next(authenticatedUser);
      token$.next(anonymousUser);
      token$.next(anonymousUser);
      token$.next(anonymousUser);
      token$.next(authenticatedUser);

      expect(result).toEqual(new LogoutEvent());
    });

    describe('ASM', () => {
      it('should NOT fire when an ASM agent logs IN if a user was NOT authenticated', () => {
        let result: LogoutEvent;
        eventService
          .get(LogoutEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        token$.next(anonymousUser);

        csAgentAuthService.authorizeCustomerSupportAgent('test', 'test');

        expect(result).toBeUndefined();
      });

      it('should NOT fire when an ASM agent logs OUT if an emulation session was in progress', async () => {
        spyOn(userIdService, 'isEmulated').and.returnValue(of(true));

        let result: LogoutEvent;
        eventService
          .get(LogoutEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        token$.next(asmUser);

        await csAgentAuthService.logoutCustomerSupportAgent();

        expect(result).toBeUndefined();
      });

      it('should NOT fire when an ASM agent logs OUT if an emulation session was NOT in progress', async () => {
        spyOn(userIdService, 'isEmulated').and.returnValue(of(false));

        let result: LogoutEvent;
        eventService
          .get(LogoutEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        token$.next(anonymousUser);

        await csAgentAuthService.logoutCustomerSupportAgent();

        expect(result).toBeUndefined();
      });
    });
  });

  describe('LoginEvent', () => {
    it('should emit a LoginEvent on LOGIN action', () => {
      let result: LoginEvent;
      eventService
        .get(LoginEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      actions$.next({ type: AuthActions.LOGIN });
      expect(result).toEqual(new LoginEvent());
    });

    it('should emit a LoginEvent for each LOGIN action', () => {
      let result: LoginEvent;
      eventService
        .get(LoginEvent)
        .pipe(take(2))
        .subscribe((value) => (result = value));

      actions$.next({ type: AuthActions.LOGIN });
      expect(result).toEqual(new LoginEvent());

      result = null;

      actions$.next({ type: AuthActions.LOGOUT });
      actions$.next({ type: AuthActions.LOGIN });
      expect(result).toEqual(new LoginEvent());
    });

    describe('ASM', () => {
      it('should fire when starting customer emulation', () => {
        let result: LoginEvent;
        eventService
          .get(LoginEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        csAgentAuthService.startCustomerEmulationSession('test id');

        expect(result).toEqual(new LoginEvent());
      });
    });
  });
});
