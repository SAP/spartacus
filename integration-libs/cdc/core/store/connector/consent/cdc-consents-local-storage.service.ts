/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of, Subscription } from 'rxjs';
import { StatePersistenceService } from '@spartacus/core';
import { Injectable, OnDestroy } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';

const KEY = 'cdc-consents-list';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentsLocalStorageService implements OnDestroy {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected cdcJsService: CdcJsService
  ) {
    this.cdcJsService.getSiteConsentDetails().subscribe((siteConsent) => {
      var consents: string[] = [];
      for (var key in siteConsent.siteConsentDetails) {
        //key will be a string with dot separated IDs
        if (Object.hasOwn(siteConsent.siteConsentDetails, key)) {
          consents.push(key);
        }
      }
      // this.syncCdcConsentsState(consents);
    });
  }
  protected subscription = new Subscription();

  syncCdcConsentsState(consents: string[]): void {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage<string[] | undefined>({
        key: KEY,
        state$: of(consents),
      })
    );
  }

  checkIfConsentExists(consentId: string): boolean {
    const consents = this.statePersistenceService.readStateFromStorage({
      key: KEY,
    }) as string[];
    return consents.includes(consentId);
  }

  protected clearCdcConsentsStorage() {
    this.statePersistenceService.syncWithStorage({
      key: KEY,
      state$: of([]),
    });
  }

  ngOnDestroy(): void {
    this.clearCdcConsentsStorage();
    this.subscription.unsubscribe();
  }
}
