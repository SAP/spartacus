import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { EventService } from 'projects/core/src/event';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthActions } from '../store/actions';
import { LoginEventBuilder } from './login-event.builder';
import { LoginEvent } from './user-auth.events';

describe('LoginEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<Action>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(LoginEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

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
