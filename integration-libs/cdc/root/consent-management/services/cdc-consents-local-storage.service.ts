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
} from '../model/index';

const KEY = 'cdc-consents-list';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentsLocalStorageService implements OnDestroy {
  constructor(protected statePersistenceService: StatePersistenceService) {}
  protected subscription = new Subscription();

  /**
   * saves active cdc consents to storage
   * @param siteConsent - cdc site consent details
   */
  persistCdcConsentsToStorage(siteConsent: CdcSiteConsentTemplate) {
    const consents: CdcLocalStorageTemplate[] = [];
    const siteDetails = siteConsent.siteConsentDetails;
    for (const key in siteDetails) {
      //key will be a string with dot separated IDs
      if (
        Object.hasOwn(siteDetails, key) &&
        siteDetails[key]?.isActive === true
      ) {
        const consent: any = {};
        consent.id = key;
        consent.required = siteDetails[key]?.isMandatory;
        consents.push(consent);
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

  /**
   * Returns cdc consents from storage
   * @returns cdc consents
   */
  readCdcConsentsFromStorage(): CdcLocalStorageTemplate[] {
    return this.statePersistenceService.readStateFromStorage({
      key: KEY,
    }) as CdcLocalStorageTemplate[];
  }

  /**
   * Returns true if input consent is present in storage, else returns false
   * @param consentId - cdc consent id
   * @returns - returns true/false
   */
  checkIfConsentExists(consentId: string): boolean {
    const consents = this.readCdcConsentsFromStorage();
    let result: boolean = false;
    consents.forEach((consent) => {
      if (consent.id === consentId) {
        result = true;
      }
    });
    return result;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
