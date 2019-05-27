import { Observable } from 'rxjs';
import { Title, User, UserSignUp } from '../../../model/misc.model';

export abstract class UserAccountAdapter {
  abstract register(user: UserSignUp): Observable<User>;

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

  abstract remove(userId: string): Observable<{}>;

  abstract loadTitles(): Observable<Title[]>;
}
