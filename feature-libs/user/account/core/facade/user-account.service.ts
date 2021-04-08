import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  User,
  UserAccountChangedEvent,
  UserAccountFacade,
} from '@spartacus/user/account/root';
import {
  LoginEvent,
  LogoutEvent,
  Query,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { switchMap } from 'rxjs/operators';
import { UserAccountConnector } from '../connectors/user-account.connector';

@Injectable()
export class UserAccountService implements UserAccountFacade {
  protected userQuery: Query<User> = this.query.create(
    () =>
      this.userIdService
        .takeUserId(true)
        .pipe(switchMap((userId) => this.userAccountConnector.get(userId))),
    {
      reloadOn: [UserAccountChangedEvent],
      resetOn: [LoginEvent, LogoutEvent],
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
  get(): Observable<User | undefined> {
    return this.userQuery.get();
  }
}
