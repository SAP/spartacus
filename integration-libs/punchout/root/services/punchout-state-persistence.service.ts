/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { StatePersistenceService } from '@spartacus/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { PunchoutFacade } from '../facade';
import { PunchoutDetectionService } from './punchout-detection.service';
import { PunchoutStoreService } from './punchout-store.service';

@Injectable({ providedIn: 'root' })
export class PunchoutStatePersistenceService implements OnDestroy {
  protected statePersistenceService = inject(StatePersistenceService);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected punchoutFacade = inject(PunchoutFacade);
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected subscription = new Subscription();
  protected hasPunchoutStarted = false;

  protected readonly PUNCHOUT_STORAGE_KEY = 'punchout';
  /**
   * Initializes the synchronization between state and browser storage.
   * Through getPunchoutSessionId(), storage is updated everytime PunchoutState is modified.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.PUNCHOUT_STORAGE_KEY,
        state$: this.getPunchoutSessionId(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state into the form that should
   * be saved in storage.
   */
  protected getPunchoutSessionId(): Observable<string | undefined> {
    return this.punchoutStoreService.getPunchoutState().pipe(
      map((punchoutState) => {
        if (punchoutState?.punchoutSessionId) {
          this.hasPunchoutStarted = true;
          return punchoutState?.punchoutSessionId;
        }
        // With 'undefined' value, no key/value gets modified or created, it keeps the storage cleaned when Punchout is unused.
        // Note that StatePersistenceService does not allow to delete key/value once it has been created.
        return this.hasPunchoutStarted ? '' : undefined;
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   * storage stores minimum data: only punchoutSessionId.
   * Full PunchoutSession object is retrieved by calling punchoutFacade.initPunchoutSession
   */
  protected onRead(punchoutSessionId: string | undefined) {
    if (
      punchoutSessionId &&
      !this.punchoutDetectionService.isPunchoutSessionPage()
    ) {
      this.punchoutStoreService.setPunchoutState({ punchoutSessionId });
      this.punchoutFacade
        .initPunchoutSession({
          punchoutSessionId,
          isPageRefresh: true,
        })
        .pipe(take(1))
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.hasPunchoutStarted = false;
    this.subscription.unsubscribe();
  }
}
