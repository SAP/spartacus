import { Injectable } from '@angular/core';
import {
  AuthService,
  CommandService,
  CommandStrategy,
  EventService,
  LanguageSetEvent,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UserAccountChangedEvent } from '@spartacus/user/account/events';

@Injectable()
export class UserProfileService implements UserProfileFacade {
  protected updateCommand = this.command.create<{ details: User }>(
    (payload) =>
      this.get().pipe(
        take(1),
        switchMap((user) =>
          this.userProfileConnector.update(user.uid, payload.details).pipe(
            tap(() => {
              this.eventService.dispatch(
                { user: payload.details },
                UserAccountChangedEvent
              );
            })
          )
        )
      ),
    {
      strategy: CommandStrategy.Queue,
    }
  );

  protected closeCommand = this.command.create(() =>
    this.get().pipe(
      take(1),
      switchMap((user) =>
        this.userProfileConnector
          .remove(user.uid)
          .pipe(tap(() => this.authService.logout()))
      )
    )
  );

  protected titleQuery = this.query.create(
    () => this.userProfileConnector.getTitles(),
    {
      reloadOn: [LanguageSetEvent],
      transferState: 'userTitles',
    }
  );

  constructor(
    protected userAccountService: UserAccountFacade,
    protected authService: AuthService,
    protected userProfileConnector: UserProfileConnector,
    protected eventService: EventService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected command: CommandService
  ) {}

  get(): Observable<User> {
    return this.userAccountService.get();
  }

  /**
   * Updates the user's details.
   *
   * @param details User details to be updated.
   */
  update(details: User): Observable<User> {
    return this.updateCommand.execute({ details });
  }

  /**
   * Closes the user account.
   */
  close(): Observable<unknown> {
    return this.closeCommand.execute(undefined);
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.titleQuery.get().pipe(map((titles) => titles ?? []));
  }
}
