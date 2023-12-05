import { Observable } from 'rxjs';
import { AnonymousConsent, ConsentTemplate } from '../../model/consent.model';
export declare abstract class AnonymousConsentTemplatesAdapter {
    /**
     * Abstract method used to load anonymous consents.
     */
    abstract loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]>;
    /**
     * Loads anonymous consents in an optimal way.
     */
    abstract loadAnonymousConsents(): Observable<AnonymousConsent[]>;
}
