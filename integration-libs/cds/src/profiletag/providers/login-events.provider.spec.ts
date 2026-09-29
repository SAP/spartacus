import { TestBed } from '@angular/core/testing';
import { APP_INITIALIZER } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { provideLoginEventsTracking } from './login-events.provider';
import { LOGIN_EVENTS, LoginEventEnvelope } from '../tokens/login-events.token';
import { Observable, Subscription, firstValueFrom } from 'rxjs';

describe('provideLoginEventsTracking', () => {
  let actions$: ActionsSubject;
  let loginEvents$: Observable<LoginEventEnvelope>;
  let subscription: Subscription;
  let mockTimestamp: number;

  beforeEach(() => {
    mockTimestamp = 1234567890;
    vi.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

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
    vi.restoreAllMocks();
  });

  it('provides LOGIN_EVENTS observable', () => {
    expect(loginEvents$).toBeTruthy();
  });

  it('emits envelope on AuthActions.LOGIN with action and timestamp', async () => {
    const resultPromise = firstValueFrom(loginEvents$);
    actions$.next({ type: AuthActions.LOGIN });
    const env = await resultPromise;
    expect(env.action.type).toBe(AuthActions.LOGIN);
    expect(env.timestamp).toBe(mockTimestamp);
    expect(Date.now).toHaveBeenCalled();
  });

  it('replays the last login event to late subscribers', async () => {
    actions$.next({ type: AuthActions.LOGIN });

    const env = await firstValueFrom(loginEvents$);
    expect(env.action.type).toBe(AuthActions.LOGIN);
    expect(env.timestamp).toBe(mockTimestamp);
  });

  it('ignores non-login actions', () => {
    const received: LoginEventEnvelope[] = [];
    const s = loginEvents$.subscribe((e) => received.push(e));
    subscription.add(s);

    actions$.next({ type: 'OTHER' });
    expect(received.length).toBe(0);
  });

  it('updates replay with the newest login event', async () => {
    const firstTimestamp = 1111111111;
    const secondTimestamp = 2222222222;

    vi.mocked(Date.now).mockReturnValue(firstTimestamp);
    actions$.next({ type: AuthActions.LOGIN });
    vi.mocked(Date.now).mockReturnValue(secondTimestamp);
    actions$.next({ type: AuthActions.LOGIN });

    const env = await firstValueFrom(loginEvents$);
    expect(env.action.type).toBe(AuthActions.LOGIN);
    expect(env.timestamp).toBe(secondTimestamp);
  });
});
