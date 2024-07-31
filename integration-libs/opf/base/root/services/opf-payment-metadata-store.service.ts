/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpfPaymentMetadata } from '../model/opf.model';

const initialState: OpfPaymentMetadata = {
  termsAndConditionsChecked: false,
  selectedPaymentOptionId: undefined,
  isPaymentInProgress: false,
  paymentSessionId: undefined,
};

@Injectable({ providedIn: 'root' })
export class OpfPaymentMetadataStoreService {
  opfPaymentMetadataState = new BehaviorSubject<OpfPaymentMetadata>(
    initialState
  );

  getOpfMetadataState(): Observable<OpfPaymentMetadata> {
    return this.opfPaymentMetadataState.asObservable();
  }

  updateOpfMetadata(payload: Partial<OpfPaymentMetadata>): void {
    this.opfPaymentMetadataState.next({
      ...this.opfPaymentMetadataState.value,
      ...payload,
    });
  }

  clearOpfMetadata(): void {
    this.opfPaymentMetadataState.next(initialState);
  }
}
