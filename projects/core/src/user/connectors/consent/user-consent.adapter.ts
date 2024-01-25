/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { ConsentTemplate } from '../../../model/consent.model';

export abstract class UserConsentAdapter {
  abstract loadConsents(userId: string): Observable<ConsentTemplate[]>;

  abstract giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate>;

  abstract withdrawConsent(
    userId: string,
    consentCode: string,
    consentId?: string
  ): Observable<{}>;
}
