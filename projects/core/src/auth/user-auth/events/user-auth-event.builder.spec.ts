import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventService } from '../../../event/event.service';
import { AuthService } from '../facade/auth.service';
import { AuthActions } from '../store/actions';
import { UserAuthEventBuilder } from './user-auth-event.builder';
import { LoginEvent, LogoutEvent } from './user-auth.events';

const isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn = () => isUserLoggedIn$.asObservable();
}

describe('UserAuthEventBuilder', () => {
  let actions$: Subject<Action>;
  let eventService: EventService;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    TestBed.inject(UserAuthEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('LogoutEvent', () => {
    it('should emit a LogoutEvent when a user logs OUT', () => {
      isUserLoggedIn$.next(true);

      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      isUserLoggedIn$.next(false);

      expect(result).toEqual(new LogoutEvent());
    });

    it('should NOT emit a LogoutEvent when a user logs IN', () => {
      isUserLoggedIn$.next(false);

      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      isUserLoggedIn$.next(true);

      expect(result).toBeUndefined();
    });

    it('should NOT emit a LogoutEvent when a user STAYS logged IN', () => {
      isUserLoggedIn$.next(true);

      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      isUserLoggedIn$.next(true);

      expect(result).toBeUndefined();
    });

    it('should emit ONE LogoutEvent when a user logs OUT', () => {
      isUserLoggedIn$.next(true);

      let result: LogoutEvent;
      eventService.get(LogoutEvent).subscribe((value) => (result = value));

      isUserLoggedIn$.next(true);
      isUserLoggedIn$.next(false);
      isUserLoggedIn$.next(false);
      isUserLoggedIn$.next(false);
      isUserLoggedIn$.next(true);

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
