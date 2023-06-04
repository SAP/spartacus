/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of, Subscription } from 'rxjs';
import { StatePersistenceService } from '@spartacus/core';
import { Injectable, OnDestroy } from '@angular/core';
import {
  CdcLocalStorageTemplate,
  CdcSiteConsentTemplate,
} from '../model/cdc-consent-management.model';

const KEY = 'cdc-consents-list';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentsLocalStorageService implements OnDestroy {
  constructor(protected statePersistenceService: StatePersistenceService) {}
  protected subscription = new Subscription();

  persistCdcConsentsToStorage(siteConsent: CdcSiteConsentTemplate) {
    var consents: CdcLocalStorageTemplate[] = [];
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
    this.subscription.add(
      this.statePersistenceService.syncWithStorage<
        CdcLocalStorageTemplate[] | undefined
      >({
        key: KEY,
        state$: of(consents),
      })
    );
  }

  readCdcConsentsFromStorage(): CdcLocalStorageTemplate[] {
    const consents = this.statePersistenceService.readStateFromStorage({
      key: KEY,
    }) as CdcLocalStorageTemplate[];
    return consents;
  }

  checkIfConsentExists(consentId: string): boolean {
    const consents = this.readCdcConsentsFromStorage();
    var result: boolean = false;
    consents.forEach((consent) => {
      if (consent.id === consentId) {
        result = true;
      }
    });
    return result;
  }

  clearCdcConsentsFromStorage() {
    this.statePersistenceService.syncWithStorage({
      key: KEY,
      state$: of([]),
    });
  }

  ngOnDestroy(): void {
    this.clearCdcConsentsFromStorage();
    this.subscription.unsubscribe();
  }
}
