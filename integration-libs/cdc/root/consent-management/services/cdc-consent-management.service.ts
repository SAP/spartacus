/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementService } from '@spartacus/storefront';
import { CdcLocalStorageTemplate } from '../model/cdc-consent-management.model';
import { CdcJsService } from '../../service';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentManagementService extends ConsentManagementService {
  constructor(
    protected store: CdcConsentsLocalStorageService,
    protected cdcJsService: CdcJsService
  ) {
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
    var consents: CdcLocalStorageTemplate[] = this.store.readCdcConsentState() || [];
    consents.forEach((consent) => {
      if (consent.required === true) {
        requiredConsents.push(consent.id);
      }
    });
    return requiredConsents;
  }
  persistCdcSiteConsents() {
    var consents: CdcLocalStorageTemplate[] = [];
    this.cdcJsService.getSiteConsentDetails().subscribe((siteConsent) => {
      var siteDetails = siteConsent.siteConsentDetails;
      for (var key in siteDetails) {
        //key will be a string with dot separated IDs
        if (Object.hasOwn(siteDetails, key)) {
          if (siteDetails[key]?.isActive === true) {
            let consent: any = {};
            consent.id = key;
            consent.required = siteDetails[key]?.isMandatory;
            consents.push(consent);
          }
        }
      }
      this.store.syncCdcConsentsState(consents);
    });
  }
}
