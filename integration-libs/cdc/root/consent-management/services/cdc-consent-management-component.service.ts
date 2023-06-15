/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementComponentService } from '@spartacus/storefront';
import { CdcLocalStorageTemplate } from '../model/index';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentManagementComponentService extends ConsentManagementComponentService {
  constructor(protected store: CdcConsentsLocalStorageService) {
    super();
  }
  getRequiredConsents(templateList: ConsentTemplate[]): string[] {
    const requiredConsents: string[] = [];
    const cdcConsents = this.getCdcConsentIDs(true);
    requiredConsents.push(...super.getRequiredConsents(templateList));
    requiredConsents.push(...cdcConsents);
    return requiredConsents;
  }

  /**
   * Returns cdc consents from store
   * @param mandatoryConsents - if passed true, only mandatory consents will be returned.
   * if passed false, all active consents (irrespective of whether they are mandatory or not)
   * @returns array of consents
   */
  getCdcConsentIDs(mandatoryConsents: boolean = false): string[] {
    const consentIDs: string[] = [];
    const consents: CdcLocalStorageTemplate[] =
      this.store.readCdcConsentsFromStorage() || [];
    consents.forEach((consent) => {
      if (mandatoryConsents === true) {
        if (consent.required === true) {
          consentIDs.push(consent.id);
        }
      } else {
        consentIDs.push(consent.id);
      }
    });
    return consentIDs;
  }
}
