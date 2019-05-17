import { Observable } from 'rxjs';
import { User } from '../../../model/misc.model';
import { UserRegisterFormData } from '../../../user/model/user.model';

export abstract class UserAccountAdapter {
  abstract register(user: UserRegisterFormData): Observable<User>;

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
}
