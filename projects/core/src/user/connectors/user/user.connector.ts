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

  register(user: UserSignUp): Observable<User> {
    return this.adapter.register(user);
  }

  registerGuest(guid: string, password: string): Observable<User> {
    return this.adapter.registerGuest(guid, password);
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
