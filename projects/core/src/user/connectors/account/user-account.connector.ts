import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title, User } from '../../../model/misc.model';
import {
  ConsentTemplate,
  ConsentTemplateList,
} from '../../../occ/occ-models/additional-occ.models';
import { UserRegisterFormData } from '../../../user/model/user.model';
import { UserAccountAdapter } from './user-account.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserAccountConnector {
  constructor(protected adapter: UserAccountAdapter) {}

  register(user: UserRegisterFormData): Observable<User> {
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

  loadConsents(userId: string): Observable<ConsentTemplateList> {
    return this.adapter.loadConsents(userId);
  }

  giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate> {
    return this.adapter.giveConsent(
      userId,
      consentTemplateId,
      consentTemplateVersion
    );
  }

  withdrawConsent(userId: string, consentCode: string): Observable<{}> {
    return this.adapter.withdrawConsent(userId, consentCode);
  }
}
