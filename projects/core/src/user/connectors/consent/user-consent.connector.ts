import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsentTemplate } from '../../../occ/occ-models/additional-occ.models';
import { UserConsentAdapter } from './user-consent.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserConsentConnector {
  constructor(protected adapter: UserConsentAdapter) {}

  loadConsents(userId: string): Observable<ConsentTemplate[]> {
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
