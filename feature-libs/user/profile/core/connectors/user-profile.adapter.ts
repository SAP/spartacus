import { User } from '@spartacus/user/details/core';
import { Observable } from 'rxjs';
import { Title, UserSignUp } from '../model/user-profile.model';

export abstract class UserProfileAdapter {
  abstract update(username: string, user: User): Observable<{}>;

  abstract register(user: UserSignUp): Observable<User>;

  abstract registerGuest(guid: string, password: string): Observable<User>;

  abstract requestForgotPasswordEmail(userEmailAddress: string): Observable<{}>;

  abstract resetPassword(token: string, newPassword: string): Observable<{}>;

  abstract updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<{}>;

  abstract updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<{}>;

  abstract close(userId: string): Observable<{}>;

  abstract loadTitles(): Observable<Title[]>;
}
