import { Observable } from 'rxjs';
import { ConsentTemplate } from '../../../model/consent.model';
export declare abstract class UserConsentAdapter {
    abstract loadConsents(userId: string): Observable<ConsentTemplate[]>;
    abstract giveConsent(userId: string, consentTemplateId: string, consentTemplateVersion: number): Observable<ConsentTemplate>;
    abstract withdrawConsent(userId: string, consentCode: string, consentId?: string): Observable<{}>;
}
