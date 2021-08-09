import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserPasswordFacade,
      feature: USER_PROFILE_CORE_FEATURE,
      methods: ['update', 'reset', 'requestForgotPasswordEmail'],
    }),
})
export abstract class UserPasswordFacade {
  /**
   * Updates the password for the user
   *
   * The method returns an observable with `LoaderState` information, including the
   * actual user data.
   *
   * @param oldPassword the current password that will be changed
   * @param newPassword the new password
   */
  abstract update(
    oldPassword: string,
    newPassword: string
  ): Observable<unknown>;

  /**
   * Reset new password. Part of the forgot password flow.
   *
   * @param token
   * @param password
   */
  abstract reset(token: string, password: string): Observable<unknown>;

  /*
   * Request an email to reset a forgotten password.
   */
  abstract requestForgotPasswordEmail(email: string): Observable<unknown>;
}
