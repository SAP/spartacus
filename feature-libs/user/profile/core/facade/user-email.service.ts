import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserProfileActions } from '../store/actions/index';
import { UPDATE_EMAIL_PROCESS_ID } from '../store/user-profile.state';
import { UserProfileService } from './user-profile.service';
@Injectable({ providedIn: 'root' })
export class UserEmailService {
  constructor(
    protected store: Store<StateWithProcess<User>>,
    protected userProfileService: UserProfileService
  ) {}

  /**
   * Updates the user's email.
   *
   * @param password to users password to confirm the users
   * @param newUid the new proposed email address.
   */
  update(
    password: string,
    newUid: string
  ): Observable<StateUtils.LoaderState<User>> {
    this.userProfileService
      .getUser()
      .pipe(
        tap((user) =>
          this.store.dispatch(
            new UserProfileActions.UpdateEmailAction({
              uid: user.uid,
              password,
              newUid,
            })
          )
        )
      )
      .subscribe();

    return this.store.pipe(
      select(ProcessSelectors.getProcessStateFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }
}
