/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { LANGUAGE_CONTEXT_ID, StatePersistenceService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpfMetadataModel } from '../model/opf-metadata-store.model';
import { OpfMetadataStoreService } from './opf-metadata-store.service';

/**
 * OPF state synced to browser storage.
 */
export interface SyncedOpfState {
  metadata?: OpfMetadataModel;
}

/**
 * Responsible for storing OPF state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({ providedIn: 'root' })
export class OpfMetadataStatePersistanceService implements OnDestroy {
  protected statePersistenceService = inject(StatePersistenceService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);

  protected subscription = new Subscription();
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
   * Gets an active content language from the browser local storage.
   */
  public getActiveLanguage(): string {
    return this.statePersistenceService.readStateFromStorage({
      key: LANGUAGE_CONTEXT_ID,
    }) as string;
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getOpfState(): Observable<SyncedOpfState> {
    return this.opfMetadataStoreService.getOpfMetadataState().pipe(
      map((metadata: OpfMetadataModel) => {
        return {
          metadata,
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: SyncedOpfState | undefined) {
    if (state && state.metadata) {
      this.opfMetadataStoreService.updateOpfMetadata(state.metadata);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
