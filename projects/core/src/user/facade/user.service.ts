import { Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { User } from '../../model/misc.model';
import { StateWithProcess } from '../../process/store/process-state';
import { StateWithUser } from '../store/user-state';
import {
  UserAccountFacadeTransitionalToken,
  UserRegisterFacadeTransitionalToken,
} from '../user-transitional-tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    // TODO: Remove transitional tokens in 4.0 with #11607
    @Optional()
    protected userAccountFacade?: UserAccountFacadeTransitionalToken,
    @Optional()
    protected userRegisterFacade?: UserRegisterFacadeTransitionalToken
  ) {}

  /**
   * Returns a user.
   *
   * @deprecated since 3.2, use `UserAccountFacade.get()` from `@spartacus/user` package.
   */
  get(): Observable<User> {
    if (this.userAccountFacade) {
      return this.userAccountFacade.get();
    }
    throw Error('Cannot get a user. `UserAccountFacade` was not provided.');
  }

  /**
   * Register a new user from guest.
   *
   * @param guid
   * @param password
   */
  registerGuest(guid: string, password: string): void {
    if (this.userRegisterFacade) {
      this.userRegisterFacade.registerGuest(guid, password);
    }
    throw Error('Cannot get a user. `UserRegisterFacade` was not provided.');
  }
}
