/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentManagementService extends ConsentManagementService {
  getRequiredConsents(templateList: ConsentTemplate[]): string[] {
    var requiredConsents: string[] = [];
    requiredConsents = super.getRequiredConsents(templateList);
    for (let consent of templateList) {
      /** make a consent disabled if it starts with 'terms or privacy' and is already set */
      if (
        consent.id &&
        (consent.id.startsWith('terms') || consent.id.startsWith('privacy')) &&
        consent.currentConsent?.consentGivenDate
      )
        requiredConsents.push(consent.id);
    }
    return requiredConsents;
  }
}
