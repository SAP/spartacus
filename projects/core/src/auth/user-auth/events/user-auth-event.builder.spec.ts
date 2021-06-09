import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject, StoreModule } from '@ngrx/store';
import { TokenResponse } from 'angular-oauth2-oidc';
import { UserService } from 'projects/core/src/user/facade/user.service';
import { of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EventService } from '../../../event/event.service';
import { User } from '../../../model/misc.model';
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

const token$ = new Subject<AuthToken>();
class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn = () =>
    token$.asObservable().pipe(map((token) => !!token.access_token));
  logout = () => token$.next(anonymousUser);
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

describe('UserAuthEventBuilder', () => {
  let actions$: Subject<Action>;
  let eventService: EventService;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
      ],
    });

    TestBed.inject(UserAuthEventBuilder); // register events
    eventService = TestBed.inject(EventService);
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
  });
});
