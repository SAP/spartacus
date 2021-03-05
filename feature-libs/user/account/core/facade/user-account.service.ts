import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { UserQuery } from '../queries/user.query';

@Injectable()
export class UserAccountService implements UserAccountFacade {
  constructor(protected userQuery: UserQuery) {}

  /**
   * Returns the current user.
   */
  get(): Observable<User> {
    return this.userQuery.get();
  }
}
