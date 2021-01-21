import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserIdService } from '@spartacus/core';
import { User, UserService } from '@spartacus/user/details/core';
import { Observable } from 'rxjs';
import { Title } from '../model/user-profile.model';
import { UserActions } from '../store/index';
import {
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

  // TODO: consider getCurrent()
  get() {
    return this.userService.get();
  }

  /**
   * Updates the user's details
   * @param userDetails to be updated
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

  getTitles(): Observable<Title[]> {
    return this.userRegisterService.getTitles();
  }
}
