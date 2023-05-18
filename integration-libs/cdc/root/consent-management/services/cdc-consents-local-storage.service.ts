/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of, Subscription } from 'rxjs';
import { StatePersistenceService } from '@spartacus/core';
import { Injectable, OnDestroy } from '@angular/core';
import { CdcLocalStorageTemplate } from '../../../core/models/cdc-site-consents.model';

const KEY = 'cdc-consents-list';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentsLocalStorageService implements OnDestroy {
  constructor(protected statePersistenceService: StatePersistenceService) {}
  protected subscription = new Subscription();

  syncCdcConsentsState(consents: CdcLocalStorageTemplate[]): void {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage<
        CdcLocalStorageTemplate[] | undefined
      >({
        key: KEY,
        state$: of(consents),
      })
    );
  }

  readCdcConsentState(): CdcLocalStorageTemplate[] {
    const consents = this.statePersistenceService.readStateFromStorage({
      key: KEY,
    }) as CdcLocalStorageTemplate[];
    return consents;
  }

  checkIfConsentExists(consentId: string): boolean {
    const consents = this.readCdcConsentState();
    var result: boolean = false;
    consents.forEach((consent) => {
      if (consent.id === consentId) {
        result = true;
      }
    });
    return result;
  }

  clearCdcConsentsStorage() {
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
