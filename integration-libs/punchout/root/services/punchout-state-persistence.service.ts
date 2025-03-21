/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { StatePersistenceService } from '@spartacus/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { PunchoutFacade } from '../facade';
import { PUNCHOUT_STORAGE_KEY, PunchoutState } from '../model';
import { PunchoutDetectionService } from './punchout-detection.service';
import { PunchoutStoreService } from './punchout-store.service';

@Injectable({ providedIn: 'root' })
export class PunchoutStatePersistanceService implements OnDestroy {
  protected statePersistenceService = inject(StatePersistenceService);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected punchoutFacade = inject(PunchoutFacade);
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected subscription = new Subscription();
  protected hasPunchoutStarted = false;

  /**
   * Initializes the synchronization between state and browser storage.
   * Through getPunchoutSessionId(), storage is updated everytime PunchoutState is modified.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: PUNCHOUT_STORAGE_KEY,
        state$: this.getPunchoutSessionId(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state into the form that should
   * be saved in storage.
   */
  protected getPunchoutSessionId(): Observable<PunchoutState | undefined> {
    return this.punchoutStoreService.getPunchoutState().pipe(
      map((punchoutState) => {
        if (punchoutState?.punchoutSessionId) {
          this.hasPunchoutStarted = true;
        }
        // With 'undefined' value, no key/value gets modified or created, it keeps the storage cleaned when Punchout is unused.
        // Note that StatePersistenceService does not allow to delete key/value once it has been created.
        return punchoutState?.punchoutSessionId
          ? { punchoutSessionId: punchoutState?.punchoutSessionId }
          : this.hasPunchoutStarted
            ? {}
            : undefined;
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   * storage stores minimum data: only punchoutSessionId.
   * Full PunchoutSession object is retrieved by calling punchoutFacade.getPunchoutSession
   */
  protected onRead(state: PunchoutState | undefined) {
    if (
      state?.punchoutSessionId &&
      !this.punchoutDetectionService.isPunchoutSessionPage()
    ) {
      this.punchoutStoreService.setPunchoutState(state);
      this.punchoutFacade
        .getPunchoutSession({
          punchoutSessionId: state?.punchoutSessionId,
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
