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
    for (let consent of templateList) {
      /** make a consent disabled only if it is required and is already set */
      if (
        consent?.required === true &&
        consent.id &&
        consent.currentConsent?.consentGivenDate
      )
        requiredConsents.push(consent.id);
    }

    return requiredConsents;
  }
}
