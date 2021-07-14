import {
  AnonymousConsent,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';
import { Observable } from 'rxjs';

export abstract class UserAnonymousConsentTemplatesAdapter {
  /**
   * Abstract method used to load anonymous consents.
   */
  abstract loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]>;

  /**
   * Loads anonymous consents in an optimal way.
   */
  abstract loadAnonymousConsents(): Observable<AnonymousConsent[]>;
}
