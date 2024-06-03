/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  abstract loadAnonymousConsents(): Observable<AnonymousConsent[]>;
}
