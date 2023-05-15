/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of, Subscription } from 'rxjs';
import { StatePersistenceService } from '@spartacus/core';
import { Injectable, OnDestroy } from '@angular/core';

const KEY = 'cdc-consents-list';

@Injectable({
  providedIn: 'root',
})
export class CdcConsentsLocalStorageService implements OnDestroy {
  constructor(protected statePersistenceService: StatePersistenceService) {}
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
    if (consents) return consents.includes(consentId);
    return false;
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
