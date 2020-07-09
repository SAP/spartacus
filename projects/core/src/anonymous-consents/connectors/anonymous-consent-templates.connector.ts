import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnonymousConsent, ConsentTemplate } from '../../model/consent.model';
import { AnonymousConsentTemplatesAdapter } from './anonymous-consent-templates.adapter';

@Injectable({
  providedIn: 'root',
})
export class AnonymousConsentTemplatesConnector {
  constructor(protected adapter: AnonymousConsentTemplatesAdapter) {}

  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return this.adapter.loadAnonymousConsentTemplates();
  }

  loadAnonymousConsents(): Observable<AnonymousConsent[]> | null {
    // TODO{#8158} - remove the conditional check, and just `return this.adapter.loadAnonymousConsents()`
    return this.adapter.loadAnonymousConsents
      ? this.adapter.loadAnonymousConsents()
      : null;
  }
}
