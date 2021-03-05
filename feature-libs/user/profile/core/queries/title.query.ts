import { Injectable } from '@angular/core';
import { AuthService, EventService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, NEVER, Observable, using } from 'rxjs';
import { catchError, filter, share, switchMapTo, tap } from 'rxjs/operators';
import { Title } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';

@Injectable({
  providedIn: 'any',
})
export class TitleQuery {
  protected titlesState$ = new BehaviorSubject<Title[] | null>(null);
  protected titlesLoad$ = this.titlesState$.pipe(
    filter((titles) => !titles),
    switchMapTo(this.userProfileConnector.getTitles()),
    tap((user) => this.titlesState$.next(user)),
    catchError(() => {
      this.titlesState$.next(null);
      return NEVER;
    }),
    share()
  );

  protected titles$: Observable<Title[]> = using(
    () => this.titlesLoad$.subscribe(),
    () => this.titlesState$
  ).pipe(filter((x) => !!x));

  constructor(
    protected userAccountService: UserAccountFacade,
    protected authService: AuthService,
    protected userProfileConnector: UserProfileConnector,
    protected eventService: EventService
  ) {}

  get() {
    return this.titles$;
  }
}
