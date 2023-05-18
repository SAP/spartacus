/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StatePersistenceService } from '@spartacus/core';
import { OpfUi } from '@spartacus/opf/payment/root';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OpfActions, OpfSelectors, StateWithOpf } from '../store';

/**
 * OPF state synced to browser storage.
 */
export interface SyncedOpfState {
  ui?: OpfUi;
}

/**
 * Responsible for storing OPF state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({
  providedIn: 'root',
})
export class OpfStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithOpf>
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'opf';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getOpfState(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getOpfState(): Observable<SyncedOpfState> {
    return combineLatest([
      this.store.pipe(
        filter((store) => !!store.opf),
        select(OpfSelectors.getOpfUi)
      ),
    ]).pipe(
      map(([ui]) => {
        return {
          ui,
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: SyncedOpfState | undefined) {
    if (state && state.ui) {
      this.store.dispatch(new OpfActions.OpfUiUpdate(state.ui));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
