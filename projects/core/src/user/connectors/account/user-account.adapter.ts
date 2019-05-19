import { Observable } from 'rxjs';
import { User } from '../../../model/misc.model';
import {
  ConsentTemplate,
  ConsentTemplateList,
} from '../../../occ/occ-models/additional-occ.models';
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

  abstract loadConsents(userId: string): Observable<ConsentTemplateList>;

  abstract giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate>;

  abstract withdrawConsent(userId: string, consentCode: string): Observable<{}>;
}
