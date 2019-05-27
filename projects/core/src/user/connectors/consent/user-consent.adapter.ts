import { Observable } from 'rxjs';
import { ConsentTemplate } from '../../../model/consent.model';

export abstract class UserConsentAdapter {
  abstract loadConsents(userId: string): Observable<ConsentTemplate[]>;

  abstract giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate>;

  abstract withdrawConsent(userId: string, consentCode: string): Observable<{}>;
}
