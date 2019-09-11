import { Observable } from 'rxjs';
import { ConsentTemplate } from '../../model/consent.model';

export abstract class AnonymousConsentTemplatesAdapter {
  abstract loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]>;
}
