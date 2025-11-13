/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AnonymousConsent, ConsentTemplate } from '../../model/consent.model';
import { AnonymousConsentTemplatesAdapter } from './anonymous-consent-templates.adapter';

@Injectable({
  providedIn: 'root',
})
export class AnonymousConsentTemplatesConnector {
  protected adapter = inject(AnonymousConsentTemplatesAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return this.adapter.loadAnonymousConsentTemplates();
  }

  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    return this.adapter.loadAnonymousConsents();
  }
}
