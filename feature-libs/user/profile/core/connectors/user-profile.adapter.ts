import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserSignUp } from '@spartacus/user/profile/root';

export abstract class UserProfileAdapter {
  abstract update(username: string, user: User): Observable<unknown>;

  abstract register(user: UserSignUp): Observable<User>;

  abstract registerGuest(guid: string, password: string): Observable<User>;

  abstract requestForgotPasswordEmail(
    userEmailAddress: string
  ): Observable<unknown>;

  abstract resetPassword(
    token: string,
    newPassword: string
  ): Observable<unknown>;

  abstract updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<unknown>;

  abstract updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<unknown>;

  abstract close(userId: string): Observable<unknown>;

  abstract loadTitles(): Observable<Title[]>;
}
