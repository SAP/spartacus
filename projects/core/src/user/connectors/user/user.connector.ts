import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title, User, UserSignUp } from '../../../model/misc.model';
import { UserAdapter } from './user.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserConnector {
  constructor(protected adapter: UserAdapter) {}

  get(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }

  update(username: string, user: User): Observable<{}> {
    return this.adapter.update(username, user);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  register(user: UserSignUp): Observable<User> {
    return this.adapter.register(user);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  registerGuest(guid: string, password: string): Observable<User> {
    return this.adapter.registerGuest(guid, password);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  requestForgotPasswordEmail(userEmailAddress: string): Observable<{}> {
    return this.adapter.requestForgotPasswordEmail(userEmailAddress);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  resetPassword(token: string, newPassword: string): Observable<{}> {
    return this.adapter.resetPassword(token, newPassword);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<{}> {
    return this.adapter.updateEmail(userId, currentPassword, newUserId);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<{}> {
    return this.adapter.updatePassword(userId, oldPassword, newPassword);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  remove(userId: string): Observable<{}> {
    return this.adapter.remove(userId);
  }

  /**
   * @deprecated since 3.2, use `UserProfileConnector` from `@spartacus/user` package
   */
  getTitles(): Observable<Title[]> {
    return this.adapter.loadTitles();
  }
}
