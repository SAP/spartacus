import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { LogoutEvent, QueryService, UserIdService } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';
import { UserAccountChangedEvent } from '@spartacus/user/account/events';
import { UserAccountConnector } from '../connectors/user-account.connector';

@Injectable()
export class UserAccountService implements UserAccountFacade {
  protected userQuery = this.query.create(
    () =>
      this.userIdService
        .takeUserId(true)
        .pipe(switchMap((userId) => this.userAccountConnector.get(userId))),
    {
      reloadOn: [UserAccountChangedEvent, UserAccountChangedEvent],
      resetOn: [LogoutEvent],
    }
  );

  constructor(
    protected userAccountConnector: UserAccountConnector,
    protected userIdService: UserIdService,
    protected query: QueryService
  ) {}

  /**
   * Returns the current user.
   */
  get(): Observable<User> {
    return this.userQuery.get();
  }
}
