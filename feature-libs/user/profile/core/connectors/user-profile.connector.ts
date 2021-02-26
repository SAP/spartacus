import { Injectable } from '@angular/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserSignUp } from '@spartacus/user/profile/root';
import { UserProfileAdapter } from './user-profile.adapter';

@Injectable()
export class UserProfileConnector {
  constructor(protected userProfileAdapter: UserProfileAdapter) {}

  update(username: string, user: User): Observable<{}> {
    return this.userProfileAdapter.update(username, user);
  }

  register(user: UserSignUp): Observable<User> {
    return this.userProfileAdapter.register(user);
  }

  registerGuest(guid: string, password: string): Observable<User> {
    return this.userProfileAdapter.registerGuest(guid, password);
  }

  requestForgotPasswordEmail(userEmailAddress: string): Observable<{}> {
    return this.userProfileAdapter.requestForgotPasswordEmail(userEmailAddress);
  }

  resetPassword(token: string, newPassword: string): Observable<{}> {
    return this.userProfileAdapter.resetPassword(token, newPassword);
  }

  updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<{}> {
    return this.userProfileAdapter.updateEmail(
      userId,
      currentPassword,
      newUserId
    );
  }

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<{}> {
    return this.userProfileAdapter.updatePassword(
      userId,
      oldPassword,
      newPassword
    );
  }

  remove(userId: string): Observable<{}> {
    return this.userProfileAdapter.close(userId);
  }

  getTitles(): Observable<Title[]> {
    return this.userProfileAdapter.loadTitles();
  }
}
