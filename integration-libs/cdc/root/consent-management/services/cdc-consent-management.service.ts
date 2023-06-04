/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementService } from '@spartacus/storefront';
import { CdcLocalStorageTemplate } from '../model/cdc-consent-management.model';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentManagementService extends ConsentManagementService {
  constructor(protected store: CdcConsentsLocalStorageService) {
    super();
  }
  getRequiredConsents(templateList: ConsentTemplate[]): string[] {
    let requiredConsents: string[] = [];
    let cdcConsents = this.getCdcRequiredConsents();
    requiredConsents = super.getRequiredConsents(templateList);
    requiredConsents.push(...cdcConsents);
    return requiredConsents;
  }
  getCdcRequiredConsents(): string[] {
    var requiredConsents: string[] = [];
    var consents: CdcLocalStorageTemplate[] =
      this.store.readCdcConsentsFromStorage() || [];
    consents.forEach((consent) => {
      if (consent.required === true) {
        requiredConsents.push(consent.id);
      }
    });
    return requiredConsents;
  }
}
