import { Injectable } from '@angular/core';
import {
  AuthService,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  LanguageSetEvent,
  Query,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import {
  User,
  UserAccountChangedEvent,
  UserAccountFacade,
} from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UserProfileService implements UserProfileFacade {
  protected updateCommand: Command<{ details: User }> = this.command.create(
    (payload) =>
      this.userIdService.takeUserId(true).pipe(
        switchMap((uid) =>
          this.userProfileConnector.update(uid, payload.details).pipe(
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

  protected closeCommand: Command = this.command.create(() =>
    this.userIdService
      .takeUserId(true)
      .pipe(
        switchMap((uid) =>
          this.userProfileConnector
            .remove(uid)
            .pipe(tap(() => this.authService.logout()))
        )
      )
  );

  protected titleQuery: Query<Title[]> = this.query.create(
    () => this.userProfileConnector.getTitles(),
    {
      reloadOn: [LanguageSetEvent],
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

  get(): Observable<User | undefined> {
    return this.userAccountService.get();
  }

  /**
   * Updates the user's details.
   *
   * @param details User details to be updated.
   */
  update(details: User): Observable<unknown> {
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
