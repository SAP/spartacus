/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementService } from '@spartacus/storefront';
import { CdcLocalStorageTemplate } from '../../../core/models/cdc-site-consents.model';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentManagementService extends ConsentManagementService {
  constructor(protected store: CdcConsentsLocalStorageService) {
    super();
  }
  getRequiredConsents(templateList: ConsentTemplate[]): string[] {
    var requiredConsents: string[] = [];
    requiredConsents = super.getRequiredConsents(templateList);
    var consents: CdcLocalStorageTemplate[] = this.store.readCdcConsentState();
    consents.forEach((consent) => {
      if (consent.required === true) {
        requiredConsents.push(consent.id);
      }
    });
    return requiredConsents;
  }
}
