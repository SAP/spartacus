import { Observable } from 'rxjs';
import { ConsentTemplate } from '../../model/consent.model';

export abstract class AnonymousConsentTemplatesAdapter {
  /**
   * Abstract method used to load anonymous consents.
   */
  abstract loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]>;
}
