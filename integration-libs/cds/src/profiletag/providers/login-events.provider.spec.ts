import { TestBed } from '@angular/core/testing';
import { APP_INITIALIZER } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { provideLoginEventsTracking } from './login-events.provider';
import { LOGIN_EVENTS, LoginEventEnvelope } from '../tokens/login-events.token';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

describe('provideLoginEventsTracking', () => {
  let actions$: ActionsSubject;
  let loginEvents$: Observable<LoginEventEnvelope>;
  let subscription: Subscription;
  let mockTimestamp: number;

  beforeEach(() => {
    mockTimestamp = 1234567890;
    spyOn(Date, 'now').and.returnValue(mockTimestamp);

    TestBed.configureTestingModule({
      providers: [
        ...provideLoginEventsTracking(),
        { provide: ActionsSubject, useFactory: () => new ActionsSubject() },
      ],
    });

    const initializers = TestBed.inject(APP_INITIALIZER);
    if (initializers && Array.isArray(initializers)) {
      TestBed.runInInjectionContext(() => {
        initializers.forEach((fn) => fn());
      });
    }

    actions$ = TestBed.inject(ActionsSubject);
    loginEvents$ = TestBed.inject(LOGIN_EVENTS);
    subscription = new Subscription();
  });

  afterEach(() => {
    subscription.unsubscribe();
    TestBed.resetTestingModule();
  });

  it('provides LOGIN_EVENTS observable', () => {
    expect(loginEvents$).toBeTruthy();
  });

  it('emits envelope on AuthActions.LOGIN with action and timestamp', (done) => {
    const s = loginEvents$.pipe(take(1)).subscribe((env) => {
      expect(env.action.type).toBe(AuthActions.LOGIN);
      expect(env.timestamp).toBe(mockTimestamp);
      expect(Date.now).toHaveBeenCalled();
      done();
    });
    subscription.add(s);
    actions$.next({ type: AuthActions.LOGIN });
  });

  it('replays the last login event to late subscribers', (done) => {
    actions$.next({ type: AuthActions.LOGIN });

    const s = loginEvents$.pipe(take(1)).subscribe((env) => {
      expect(env.action.type).toBe(AuthActions.LOGIN);
      expect(env.timestamp).toBe(mockTimestamp);
      done();
    });
    subscription.add(s);
  });

  it('ignores non-login actions', (done) => {
    const received: LoginEventEnvelope[] = [];
    const s = loginEvents$.subscribe((e) => received.push(e));
    subscription.add(s);

    actions$.next({ type: 'OTHER' });
    expect(received.length).toBe(0);
    done();
  });

  it('updates replay with the newest login event', (done) => {
    const firstTimestamp = 1111111111;
    const secondTimestamp = 2222222222;

    (Date.now as jasmine.Spy).and.returnValue(firstTimestamp);
    actions$.next({ type: AuthActions.LOGIN });
    (Date.now as jasmine.Spy).and.returnValue(secondTimestamp);
    actions$.next({ type: AuthActions.LOGIN });

    const s = loginEvents$.pipe(take(1)).subscribe((env) => {
      expect(env.action.type).toBe(AuthActions.LOGIN);
      expect(env.timestamp).toBe(secondTimestamp);
      done();
    });
    subscription.add(s);
  });
});
