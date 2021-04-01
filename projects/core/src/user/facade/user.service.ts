import { Injectable, Optional } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Title, User, UserSignUp } from '../../model/misc.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  REGISTER_USER_PROCESS_ID,
  REMOVE_USER_PROCESS_ID,
  StateWithUser,
  UPDATE_EMAIL_PROCESS_ID,
  UPDATE_PASSWORD_PROCESS_ID,
  UPDATE_USER_DETAILS_PROCESS_ID,
  USER_FEATURE,
} from '../store/user-state';
import {
  UserAccountFacadeTransitionalToken,
  UserProfileFacadeTransitionalToken,
  UserRegisterFacadeTransitionalToken,
} from '../user-transitional-tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    userIdService: UserIdService,
    userAccountFacade?: UserAccountFacadeTransitionalToken,

    userProfileFacade?: UserProfileFacadeTransitionalToken,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    userRegisterFacade?: UserRegisterFacadeTransitionalToken
  );
  /**
   * @deprecated since 3.2
   *
   * @param store
   * @param userIdService
   */
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    userIdService: UserIdService
  );

  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    @Optional()
    protected userAccountFacade?: UserAccountFacadeTransitionalToken,
    @Optional()
    protected userProfileFacade?: UserProfileFacadeTransitionalToken,
    @Optional()
    protected userRegisterFacade?: UserRegisterFacadeTransitionalToken
  ) {}

  /**
   * Returns a user.
   *
   * @deprecated since 3.2, use `UserAccountService.get()` from `@spartacus/user` package.
   */
  get(): Observable<User> {
    if (this.userAccountFacade) {
      return this.userAccountFacade.get();
    }
    return this.store.pipe(
      // workaround for using lazy loaded user/account library
      filter((state) => state[USER_FEATURE]),
      select(UsersSelectors.getDetails),
      tap((details) => {
        if (Object.keys(details).length === 0) {
          this.load();
        }
      })
    );
  }

  /**
   * Loads the user's details.
   *
   * @deprecated since 3.2, use `UserAccountService.load()` from `@spartacus/user` package.
   */
  load(): void {
    this.userIdService.invokeWithUserId((userId) => {
      if (userId !== OCC_USER_ID_ANONYMOUS) {
        this.store.dispatch(new UserActions.LoadUserDetails(userId));
      }
    });
  }

  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   *
   * @deprecated since 3.2, use `UserRegisterService.register()` from `@spartacus/user` package.
   */
  register(userRegisterFormData: UserSignUp): void {
    this.store.dispatch(new UserActions.RegisterUser(userRegisterFormData));
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
    } else {
      this.store.dispatch(new UserActions.RegisterGuest({ guid, password }));
    }
  }

  /**
   * Returns the register user process loading flag.
   *
   * @deprecated since 3.2, use `UserRegisterService.registerCallState.isLoading()`
   * from `@spartacus/user` package.
   */
  getRegisterUserResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(REGISTER_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the register user process success flag.
   *
   * @deprecated since 3.2, use `UserRegisterService.registerCallState.isLoaded()`
   * from `@spartacus/user` package.
   */
  getRegisterUserResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(REGISTER_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the register user process error flag
   *
   * @deprecated since 3.2, use `UserRegisterService.registerCallState.hasError()`
   * from `@spartacus/user` package.
   */
  getRegisterUserResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(REGISTER_USER_PROCESS_ID))
    );
  }

  /**
   * Resets the register user process flags
   *
   * @deprecated since 3.2, use `UserRegisterService.registerCallState.clear()`
   * from `@spartacus/user` package.
   */
  resetRegisterUserProcessState(): void {
    return this.store.dispatch(new UserActions.ResetRegisterUserProcess());
  }

  /**
   * Remove user account, that's also called close user's account.
   *
   * @deprecated since 3.2, use `UserProfileService.close()` from `@spartacus/user` package.
   */
  remove(): void {
    this.userIdService.invokeWithUserId((userId) => {
      this.store.dispatch(new UserActions.RemoveUser(userId));
    });
  }

  /**
   * Returns the remove user loading flag.
   *
   * @deprecated since 3.2, use `UseProfileService.closeAccountCallState.isLoading()`
   * from `@spartacus/user` package.
   */
  getRemoveUserResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the remove user failure outcome.
   *
   * @deprecated since 3.2, use `UseProfileService.closeAccountCallState.hasError()`
   * from `@spartacus/user` package.
   */
  getRemoveUserResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the remove user process success outcome.
   *
   * @deprecated since 3.2, use `UseProfileService.closeAccountCallState.isLoaded()`
   * from `@spartacus/user` package.
   */
  getRemoveUserResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Resets the remove user process state. The state needs to be reset after the process
   * concludes, regardless if it's a success or an error
   *
   * @deprecated since 3.2, use `UseProfileService.closeAccountCallState.clear()`
   * from `@spartacus/user` package.
   *
   */
  resetRemoveUserProcessState(): void {
    this.store.dispatch(new UserActions.RemoveUserReset());
  }

  /**
   * Returns titles.
   *
   * @deprecated since 3.2, use `UserProfileService.getTitles()` from `@spartacus/user` package.
   */
  getTitles(): Observable<Title[]> {
    if (this.userProfileFacade) {
      return this.userProfileFacade.getTitles();
    }
    return this.store.pipe(
      // workaround for using lazy loaded user/account library
      filter((state) => state[USER_FEATURE]),
      select(UsersSelectors.getAllTitles),
      tap((titles: Title[]) => {
        if (Object.keys(titles).length === 0) {
          this.loadTitles();
        }
      })
    );
  }

  /**
   * Retrieves titles.
   *
   * @deprecated since 3.2, use `UserRegisterService.loadTitles()` from `@spartacus/user` package.
   */
  loadTitles(): void {
    this.store.dispatch(new UserActions.LoadTitles());
  }

  /**
   * Return whether user's password is successfully reset.
   *
   * @deprecated since 3.2, use `UserPasswordService.updatePasswordCallState.isLoaded()`
   * from `@spartacus/user` package.
   */
  isPasswordReset(): Observable<boolean> {
    return this.store.pipe(
      // workaround for using lazy loaded user/account library
      filter((state) => state[USER_FEATURE]),
      select(UsersSelectors.getResetPassword)
    );
  }

  /**
   * Updates the user's details.
   *
   * @param userDetails to be updated
   *
   * @deprecated since 3.2, use `UserProfileService.update()` from `@spartacus/user` package.
   */
  updatePersonalDetails(userDetails: User): void {
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
   * Returns the update user's personal details loading flag.
   *
   * @deprecated since 3.2, use `UserProfileService.updateProfileCallState.isLoading()`
   * from `@spartacus/user` package.
   */
  getUpdatePersonalDetailsResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's personal details error flag.
   *
   * @deprecated since 3.2, use `UserProfileService.updateProfileCallState.hasError()`
   * from `@spartacus/user` package.
   */
  getUpdatePersonalDetailsResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's personal details success flag.
   *
   * @deprecated since 3.2, use `UserProfileService.updateProfileCallState.isLoaded()`
   * from `@spartacus/user` package.
   */
  getUpdatePersonalDetailsResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Resets the update user details processing state.
   *
   * @deprecated since 3.2, use `UserProfileService.updateProfileCallState.clear()`
   * from `@spartacus/user` package.
   */
  resetUpdatePersonalDetailsProcessingState(): void {
    this.store.dispatch(new UserActions.ResetUpdateUserDetails());
  }

  /**
   * Reset new password.  Part of the forgot password flow.
   *
   * @param token
   * @param password
   *
   * @deprecated since 3.2, use `UserPasswordService.reset()` from `@spartacus/user` package.
   */
  resetPassword(token: string, password: string): void {
    this.store.dispatch(new UserActions.ResetPassword({ token, password }));
  }

  /**
   * Request an email to reset a forgotten password.
   *
   * @deprecated since 3.2, use `UserPasswordService.requestForgotPasswordEmail()`
   * from `@spartacus/user` package.
   */
  requestForgotPasswordEmail(userEmailAddress: string): void {
    this.store.dispatch(
      new UserActions.ForgotPasswordEmailRequest(userEmailAddress)
    );
  }

  /**
   * Updates the user's email.
   *
   * @deprecated since 3.2, use `UserEmailService.update()` from `@spartacus/user` package.
   */
  updateEmail(password: string, newUid: string): void {
    this.userIdService.invokeWithUserId((userId) => {
      this.store.dispatch(
        new UserActions.UpdateEmailAction({
          uid: userId,
          password,
          newUid,
        })
      );
    });
  }

  /**
   * Returns the update user's email success flag.
   *
   * @deprecated since 3.2, use `UserRegisterService.updateEmailCallState.isLoaded()`
   * from `@spartacus/user` package.
   */
  getUpdateEmailResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email error flag.
   *
   * @deprecated since 3.2, use `UserRegisterService.updateEmailCallState.hasError()`
   * from `@spartacus/user` package.
   */
  getUpdateEmailResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email loading flag.
   *
   * @deprecated since 3.2, use `UserRegisterService.updateEmailCallState.isLoading()`
   * from `@spartacus/user` package.
   */
  getUpdateEmailResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Resets the update user's email processing state.
   *
   * @deprecated since 3.2, use `UserRegisterService.updateEmailCallState.clear()`
   * from `@spartacus/user` package.
   */
  resetUpdateEmailResultState(): void {
    this.store.dispatch(new UserActions.ResetUpdateEmailAction());
  }

  /**
   * Updates the password for the user.
   *
   * @param oldPassword the current password that will be changed
   * @param newPassword the new password
   *
   * @deprecated since 3.2, use `UserPasswordService.update()` from `@spartacus/user` package.
   */
  updatePassword(oldPassword: string, newPassword: string): void {
    this.userIdService.invokeWithUserId((userId) => {
      this.store.dispatch(
        new UserActions.UpdatePassword({
          userId,
          oldPassword,
          newPassword,
        })
      );
    });
  }

  /**
   * Returns the update password loading flag.
   *
   * @deprecated since 3.2, use `UserPasswordService.updatePasswordCallState.isLoading()`
   * from `@spartacus/user` package.
   */
  getUpdatePasswordResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Returns the update password failure outcome.
   *
   * @deprecated since 3.2, use `UserPasswordService.updatePasswordCallState.hasError()`
   * from `@spartacus/user` package.
   */
  getUpdatePasswordResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Returns the update password process success outcome.
   *
   * @deprecated since 3.2, use `UserPasswordService.updatePasswordCallState.isLoaded()`
   * from `@spartacus/user` package.
   */
  getUpdatePasswordResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Resets the update password process state. The state needs to be reset after the process
   * concludes, regardless if it's a success or an error
   *
   * @deprecated since 3.2, use `UserPasswordService.updatePasswordCallState.clear()`
   * from `@spartacus/user` package.
   */
  resetUpdatePasswordProcessState(): void {
    this.store.dispatch(new UserActions.UpdatePasswordReset());
  }
}
