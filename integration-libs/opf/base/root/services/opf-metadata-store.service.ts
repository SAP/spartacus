/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpfMetadataModel } from '../model/opf-metadata-store.model';

@Injectable({ providedIn: 'root' })
export class OpfMetadataStoreService {
  protected readonly INITIAL_STATE: OpfMetadataModel = Object.freeze({
    termsAndConditionsChecked: false,
    selectedPaymentOptionId: undefined,
    isPaymentInProgress: false,
    opfPaymentSessionId: undefined,
    isTermsAndConditionsAlertClosed: false,
  });

  opfMetadataState = new BehaviorSubject<OpfMetadataModel>(this.INITIAL_STATE);

  getOpfMetadataState(): Observable<OpfMetadataModel> {
    return this.opfMetadataState.asObservable();
  }

  updateOpfMetadata(payload: Partial<OpfMetadataModel>): void {
    this.opfMetadataState.next({
      ...this.opfMetadataState.value,
      ...payload,
    });
  }

  clearOpfMetadata(): void {
    this.opfMetadataState.next(this.INITIAL_STATE);
  }
}
