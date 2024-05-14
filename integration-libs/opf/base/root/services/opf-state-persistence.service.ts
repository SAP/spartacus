/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { StatePersistenceService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpfPaymentMetadata } from '../model/opf.model';
import { OpfPaymentMetadataStoreService } from './opf-payment-metadata-store.service';

/**
 * OPF state synced to browser storage.
 */
export interface SyncedOpfState {
  metadata?: OpfPaymentMetadata;
}

/**
 * Responsible for storing OPF state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({ providedIn: 'root' })
export class OpfStatePersistenceService implements OnDestroy {
  protected statePersistenceService = inject(StatePersistenceService);
  protected opfPaymentMetadataStoreService = inject(
    OpfPaymentMetadataStoreService
  );

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
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getOpfState(): Observable<SyncedOpfState> {
    return this.opfPaymentMetadataStoreService.getOpfMetadataState().pipe(
      map((metadata: OpfPaymentMetadata) => {
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
      this.opfPaymentMetadataStoreService.updateOpfMetadata(state.metadata);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
