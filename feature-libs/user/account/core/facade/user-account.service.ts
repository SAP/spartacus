/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  LoginEvent,
  LogoutEvent,
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
   * Returns the user according the userId
   * no use query for userId can change every time
   */
  getById(userId: string): Observable<User | undefined> {
    return this.userAccountConnector.get(userId);
  }

  /**
   * Returns the current user.
   */
  get(): Observable<User | undefined> {
    return this.userQuery.get();
  }
}
