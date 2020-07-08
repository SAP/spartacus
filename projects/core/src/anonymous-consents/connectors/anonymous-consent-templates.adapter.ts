import { Observable } from 'rxjs';
import { AnonymousConsent, ConsentTemplate } from '../../model/consent.model';

export abstract class AnonymousConsentTemplatesAdapter {
  /**
   * Abstract method used to load anonymous consents.
   */
  abstract loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]>;

  /**
   * Loads anonymous consents in an optimal way.
   */
  // TODO:#anon - create a deprecation ticket and mention this
  abstract loadAnonymousConsents?(): Observable<AnonymousConsent[]>;
}
