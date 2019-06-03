import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Title, User, UserSignUp } from '../../model/misc.model';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import * as fromProcessStore from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import * as fromStore from '../store/index';
import {
  UPDATE_EMAIL_PROCESS_ID,
  UPDATE_USER_DETAILS_PROCESS_ID,
} from '../store/user-state';

@Injectable()
export class UserService {
  constructor(
    protected store: Store<
      fromStore.StateWithUser | fromProcessStore.StateWithProcess<void>
    >
  ) {}

  /**
   * Returns a user
   */
  get(): Observable<User> {
    return this.store.pipe(select(fromStore.getDetails));
  }

  /**
   * Loads the user's details
   */
  load(): void {
    this.store.dispatch(new fromStore.LoadUserDetails(USERID_CURRENT));
  }

  /**
   * Register a new user
   *
   * @param submitFormData as UserRegisterFormData
   */
  register(userRegisterFormData: UserSignUp): void {
    this.store.dispatch(new fromStore.RegisterUser(userRegisterFormData));
  }

  /**
   * Remove user account, that's also called close user's account
   */
  remove(): void {
    this.store.dispatch(new fromStore.RemoveUser(USERID_CURRENT));
  }

  /**
   * Returns the remove user loading flag
   */
  getRemoveUserResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(fromStore.REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the remove user failure outcome.
   */
  getRemoveUserResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(fromStore.REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the remove user process success outcome.
   */
  getRemoveUserResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(fromStore.REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Resets the remove user process state. The state needs to be reset after the process
   * concludes, regardless if it's a success or an error
   */
  resetRemoveUserProcessState(): void {
    this.store.dispatch(new fromStore.RemoveUserReset());
  }

  /**
   * Returns titles
   */
  getTitles(): Observable<Title[]> {
    return this.store.pipe(select(fromStore.getAllTitles));
  }

  /**
   * Retrieves titles
   */
  loadTitles(): void {
    this.store.dispatch(new fromStore.LoadTitles());
  }

  /**
   * Return whether user's password is successfully reset
   */
  isPasswordReset(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getResetPassword));
  }

  /**
   * Updates the user's details
   * @param userDetails to be updated
   */
  updatePersonalDetails(userDetails: User): void {
    this.store.dispatch(
      new fromStore.UpdateUserDetails({ username: USERID_CURRENT, userDetails })
    );
  }

  /**
   * Returns the update user's personal details loading flag
   */
  getUpdatePersonalDetailsResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's personal details error flag
   */
  getUpdatePersonalDetailsResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's personal details success flag
   */
  getUpdatePersonalDetailsResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Resets the update user details processing state
   */
  resetUpdatePersonalDetailsProcessingState(): void {
    this.store.dispatch(new fromStore.ResetUpdateUserDetails());
  }

  /**
   * Reset new password.  Part of the forgot password flow.
   * @param token
   * @param password
   */
  resetPassword(token: string, password: string): void {
    this.store.dispatch(new fromStore.ResetPassword({ token, password }));
  }

  /*
   * Request an email to reset a forgotten password.
   */
  requestForgotPasswordEmail(userEmailAddress: string): void {
    this.store.dispatch(
      new fromStore.ForgotPasswordEmailRequest(userEmailAddress)
    );
  }

  /**
   * Updates the user's email
   */
  updateEmail(password: string, newUid: string): void {
    this.store.dispatch(
      new fromStore.UpdateEmailAction({ uid: USERID_CURRENT, password, newUid })
    );
  }

  /**
   * Returns the update user's email success flag
   */
  getUpdateEmailResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email error flag
   */
  getUpdateEmailResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email loading flag
   */
  getUpdateEmailResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Resets the update user's email processing state
   */
  resetUpdateEmailResultState(): void {
    this.store.dispatch(new fromStore.ResetUpdateEmailAction());
  }

  /**
   * Updates the password for the user
   * @param oldPassword the current password that will be changed
   * @param newPassword the new password
   */
  updatePassword(oldPassword: string, newPassword: string): void {
    this.store.dispatch(
      new fromStore.UpdatePassword({
        userId: USERID_CURRENT,
        oldPassword,
        newPassword,
      })
    );
  }

  /**
   * Returns the update password loading flag
   */
  getUpdatePasswordResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(fromStore.UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Returns the update password failure outcome.
   */
  getUpdatePasswordResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(fromStore.UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Returns the update password process success outcome.
   */
  getUpdatePasswordResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(fromStore.UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Resets the update password process state. The state needs to be reset after the process
   * concludes, regardless if it's a success or an error
   */
  resetUpdatePasswordProcessState(): void {
    this.store.dispatch(new fromStore.UpdatePasswordReset());
  }
}
