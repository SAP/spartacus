import { Injectable, OnDestroy } from '@angular/core';
import { EventService, normalizeHttpError } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { EMPTY, Observable, Subject, Subscription } from 'rxjs';
import { catchError, concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { UserAccountChangedEvent } from '@spartacus/user/account/events';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Injectable({
  providedIn: 'any',
})
export class UpdateProfileCommand implements OnDestroy {
  protected updateProfileTrigger$ = new Subject<{
    details: User;
    result: Subject<User>;
  }>();

  protected updateProfileProcess$ = this.updateProfileTrigger$.pipe(
    withLatestFrom(this.userAccountService.get()),
    concatMap(([{ details, result }, user]) => {
      return this.userProfileConnector.update(user.uid, details).pipe(
        tap(() => {
          this.eventService.dispatch(
            { user: details },
            UserAccountChangedEvent
          );
          result.next(details);
          result.complete();
        }),
        catchError((error) => {
          result.error(normalizeHttpError(error));
          return EMPTY;
        })
      );
    })
  );

  subscription = new Subscription();

  constructor(
    protected userProfileConnector: UserProfileConnector,
    protected eventService: EventService,
    protected userAccountService: UserAccountFacade
  ) {
    this.subscription.add(this.updateProfileProcess$.subscribe());
  }

  execute(details: User): Observable<User> {
    const result = new Subject<User>();
    this.updateProfileTrigger$.next({ details, result });
    return result;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
