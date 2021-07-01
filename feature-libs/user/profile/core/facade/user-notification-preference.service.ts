import { Injectable } from '@angular/core';
import {
  Command,
  CommandService,
  CommandStrategy,
  Query,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import {
  NotificationPreference,
  UserNotificationPreferenceFacade,
} from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserNotificationPreferenceConnector } from '../connectors/user-notification-preference.connector';

@Injectable()
export class UserNotificationPreferenceService
  implements UserNotificationPreferenceFacade {
  constructor(
    protected query: QueryService,
    protected command: CommandService,
    protected userNotificationPreferenceConnector: UserNotificationPreferenceConnector,
    protected userIdService: UserIdService
  ) {}

  loadAll(): Observable<NotificationPreference[]> {
    return this.preferenceQuery
      .get()
      .pipe(map((preferences) => preferences ?? []));
  }

  update(preferences: NotificationPreference[]): Observable<unknown> {
    return this.updateCommand.execute({ preferences });
  }

  protected preferenceQuery: Query<
    NotificationPreference[]
  > = this.query.create(() =>
    this.userIdService
      .takeUserId(true)
      .pipe(
        switchMap((id) => this.userNotificationPreferenceConnector.loadAll(id))
      )
  );

  protected updateCommand: Command<{
    preferences: NotificationPreference[];
  }> = this.command.create(
    (payload) =>
      this.userIdService
        .takeUserId(true)
        .pipe(
          switchMap((uid) =>
            this.userNotificationPreferenceConnector.update(
              uid,
              payload.preferences
            )
          )
        ),
    {
      strategy: CommandStrategy.Queue,
    }
  );
}
