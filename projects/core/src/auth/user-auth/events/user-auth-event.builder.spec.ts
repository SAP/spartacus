import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventService } from '../../../event/event.service';
import { User } from '../../../model/misc.model';
import { UserService } from '../../../user/facade/user.service';
import { AuthActions } from '../store/actions';
import { UserAuthEventBuilder } from './user-auth-event.builder';
import { LoginEvent, LogoutEvent } from './user-auth.events';

const userData$ = new BehaviorSubject<User>({});
class MockUserService implements Partial<UserService> {
  get = () => userData$.asObservable();
}

describe('UserAuthEventBuilder', () => {
  let actions$: Subject<Action>;
  let eventService: EventService;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        { provide: UserService, useClass: MockUserService },
      ],
    });

    TestBed.inject(UserAuthEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('LogoutEvent', () => {
    it('should emit a LogoutEvent on LOGOUT action', () => {
      userData$.next({ customerId: 'test' });

      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      userData$.next({});
      actions$.next({ type: AuthActions.LOGOUT });

      expect(result).toEqual(new LogoutEvent());
    });

    it('should NOT emit a LogoutEvent on LOGOUT action if the user is NOT authenticated', () => {
      userData$.next({});

      let result: LogoutEvent;
      eventService
        .get(LogoutEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      userData$.next({});
      actions$.next({ type: AuthActions.LOGOUT });

      expect(result).toBeUndefined();
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
