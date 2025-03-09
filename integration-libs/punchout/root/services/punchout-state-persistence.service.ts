/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { StatePersistenceService } from '@spartacus/core';
import { map, Observable, Subscription } from 'rxjs';
import { PunchoutState } from '../model';
import { PunchoutStoreService } from './punchout-store.service';

@Injectable({ providedIn: 'root' })
export class PunchoutStatePersistanceService implements OnDestroy {
  protected statePersistenceService = inject(StatePersistenceService);
  protected punchoutStoreService = inject(PunchoutStoreService);

  protected subscription = new Subscription();
  /**
   * Identifier used for storage key.
   */
  protected key = 'punchout';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getPunchoutState(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getPunchoutState(): Observable<PunchoutState> {
    return this.punchoutStoreService.getPunchoutState().pipe(
      map((p) => {
        return { ...p, session: undefined };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: PunchoutState | undefined) {
    if (state?.sId && state?.session) {
      this.punchoutStoreService.setPunchoutState(state);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
