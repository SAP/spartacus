import { Injectable } from '@angular/core';
import {
  AnonymousConsent,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';
import { Observable } from 'rxjs';
import { UserAnonymousConsentTemplatesAdapter } from './user-anonymous-consent-templates.adapter';

// TODO:#anon removed the provided in root
@Injectable()
export class UserAnonymousConsentTemplatesConnector {
  constructor(protected adapter: UserAnonymousConsentTemplatesAdapter) {}

  // TODO:#anon consider removing
  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return this.adapter.loadAnonymousConsentTemplates();
  }

  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    return this.adapter.loadAnonymousConsents();
  }
}
