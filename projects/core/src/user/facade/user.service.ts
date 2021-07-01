import { Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { User } from '../../model/misc.model';
import { StateWithProcess } from '../../process/store/process-state';
import { StateWithUser } from '../store/user-state';
import { UserAccountFacadeTransitionalToken } from '../user-transitional-tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    // TODO: Remove transitional tokens in 4.0 with #11607
    @Optional()
    protected userAccountFacade?: UserAccountFacadeTransitionalToken
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
    throw Error('Cannot get a user. Install `@spartacus/user` library which provides required services.');
  }
}
