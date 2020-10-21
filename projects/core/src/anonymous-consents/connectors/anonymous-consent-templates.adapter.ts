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
  // TODO{#8158} - make this method required by removing the the `?` after the method name
  abstract loadAnonymousConsents?(): Observable<AnonymousConsent[]>;
}
