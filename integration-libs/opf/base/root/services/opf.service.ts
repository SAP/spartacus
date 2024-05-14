/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { OpfPaymentMetadata } from '../model';
import { OpfPaymentMetadataStoreService } from './opf-payment-metadata-store.service';

@Injectable({
  providedIn: 'root',
})
export class OpfService {
  protected opfPaymentMetadataStoreService = inject(
    OpfPaymentMetadataStoreService
  );

  /**
   * Updates the state of the OPF metadata
   */
  updateOpfMetadataState(opfMetadata: Partial<OpfPaymentMetadata>): void {
    this.opfPaymentMetadataStoreService.updateOpfMetadata(opfMetadata);
  }

  /**
   * Clears the state of the OPF metadata
   */
  clearOpfMetadataState(): void {
    this.opfPaymentMetadataStoreService.clearOpfMetadata();
  }

  /**
   * Get the state of the OPF metadata
   */
  getOpfMetadataState(): Observable<OpfPaymentMetadata> {
    return this.opfPaymentMetadataStoreService.getOpfMetadataState();
  }
}
