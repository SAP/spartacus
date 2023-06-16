/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { OpfPaymentMetadata } from '../model';
import { OpfPaymentMetadataStoreService } from './opf-payment-metadata-store.service';

@Injectable({
  providedIn: 'root',
})
export class OpfService {
  constructor(
    protected opfPaymentMetadataStoreService: OpfPaymentMetadataStoreService
  ) {}

  /**
   * Updates the state of the OPF metadata
   */
  updateOpfMetadataState(opfMetadata: Partial<OpfPaymentMetadata>): void {
    this.opfPaymentMetadataStoreService.opfMetadataUpdate(opfMetadata);
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
