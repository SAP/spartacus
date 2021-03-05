import { Injectable, OnDestroy } from '@angular/core';
import { AuthService, EventService, UserIdService } from '@spartacus/core';
import {
  BehaviorSubject,
  NEVER,
  queueScheduler,
  Subscription,
  using,
} from 'rxjs';
import {
  catchError,
  filter,
  observeOn,
  repeatWhen,
  share,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import { User } from '@spartacus/user/account/root';
import { UserAccountChangedEvent } from '@spartacus/user/account/events';
import { UserAccountConnector } from '../connectors/user-account.connector';

@Injectable({
  providedIn: 'any',
})
export class UserQuery implements OnDestroy {
  protected userState$ = new BehaviorSubject<User | null>(null);

  protected userLoad$ = this.userState$.pipe(
    filter((user) => !user),
    observeOn(queueScheduler),
    switchMapTo(this.userIdService.takeUserId(true)),
    switchMap((userId) =>
      this.userAccountConnector.get(userId).pipe(
        repeatWhen(() =>
          this.eventService.get(UserAccountChangedEvent).pipe(
            tap((event) => {
              // optimistic update
              this.userState$.next({ ...this.userState$.value, ...event.user });
            })
          )
        )
      )
    ),
    tap(() => {
      if (!this.clearStateSubscription) {
        this.clearStateSubscription = this.clearUserState$.subscribe();
      }
    }),
    tap((user) => {
      this.userState$.next(user);
    }),
    catchError(() => {
      this.userState$.next(null);
      return NEVER;
    }),
    share()
  );

  protected clearUserState$ = this.authService.isUserLoggedIn().pipe(
    filter((loggedIn) => !loggedIn),
    tap(() => {
      this.userState$.next(null);
    })
  );

  protected clearStateSubscription: Subscription;

  protected user$ = using(
    () => this.userLoad$.subscribe(),
    () => this.userState$
  );

  constructor(
    protected userIdService: UserIdService,
    protected eventService: EventService,
    private userAccountConnector: UserAccountConnector,
    protected authService: AuthService
  ) {}

  get() {
    return this.user$;
  }

  ngOnDestroy(): void {
    this.clearStateSubscription?.unsubscribe();
  }
}
