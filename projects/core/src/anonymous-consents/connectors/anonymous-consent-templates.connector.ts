/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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

  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    return this.adapter.loadAnonymousConsents();
  }
}
