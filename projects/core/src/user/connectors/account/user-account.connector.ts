import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title, User, UserSignUp } from '../../../model/misc.model';
import { UserAccountAdapter } from './user-account.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserAccountConnector {
  constructor(protected adapter: UserAccountAdapter) {}

  register(user: UserSignUp): Observable<User> {
    return this.adapter.register(user);
  }

  requestForgotPasswordEmail(userEmailAddress: string): Observable<{}> {
    return this.adapter.requestForgotPasswordEmail(userEmailAddress);
  }

  resetPassword(token: string, newPassword: string): Observable<{}> {
    return this.adapter.resetPassword(token, newPassword);
  }

  updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<{}> {
    return this.adapter.updateEmail(userId, currentPassword, newUserId);
  }

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<{}> {
    return this.adapter.updatePassword(userId, oldPassword, newPassword);
  }

  remove(userId: string): Observable<{}> {
    return this.adapter.remove(userId);
  }

  getTitles(): Observable<Title[]> {
    return this.adapter.loadTitles();
  }
}
