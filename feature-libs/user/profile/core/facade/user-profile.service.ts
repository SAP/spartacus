import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserIdService, UserService } from '@spartacus/core';
import { User } from '@spartacus/user/details/core';
import { Observable } from 'rxjs';
import { Title } from '../model/user-profile.model';
import { UserActions } from '../store/index';
import {
  REMOVE_USER_PROCESS_ID,
  StateWithUserProfile,
  UPDATE_USER_DETAILS_PROCESS_ID,
} from '../store/user-profile.state';
import { UserRegisterService } from './user-register.service';
import { getCallState } from './utils';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(
    protected store: Store<StateWithUserProfile>,
    protected userIdService: UserIdService,
    protected userService: UserService,
    protected userRegisterService: UserRegisterService
  ) {}

  updateProfileCallState = getCallState(
    this.store,
    UPDATE_USER_DETAILS_PROCESS_ID,
    () => {
      this.store.dispatch(new UserActions.UpdatePasswordReset());
    }
  );

  closeAccountCallState = getCallState(
    this.store,
    REMOVE_USER_PROCESS_ID,
    () => {
      this.store.dispatch(new UserActions.RemoveUserReset());
    }
  );

  // TODO: consider getCurrent()
  get() {
    return this.userService.get();
  }

  /**
   * Updates the user's details.
   *
   * @param userDetails to be updated.
   */
  update(userDetails: User): void {
    this.userIdService.invokeWithUserId((userId) => {
      this.store.dispatch(
        new UserActions.UpdateUserDetails({
          username: userId,
          userDetails,
        })
      );
    });
  }

  /**
   * Closes the user account.
   */
  close(): void {
    this.userIdService.invokeWithUserId((userId) => {
      this.store.dispatch(new UserActions.RemoveUser(userId));
    });
  }

  getTitles(): Observable<Title[]> {
    return this.userRegisterService.getTitles();
  }
}
