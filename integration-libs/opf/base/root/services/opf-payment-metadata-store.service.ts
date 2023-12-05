/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpfPaymentMetadata } from '../model/opf.model';

const initialState = {
  termsAndConditionsChecked: false,
  selectedPaymentOptionId: undefined,
  isPaymentInProgress: false,
  isQuickBuyPaymentInProgress: false,
};

@Injectable({ providedIn: 'root' })
export class OpfPaymentMetadataStoreService {
  opfPaymentMetadataState = new BehaviorSubject<OpfPaymentMetadata>(
    initialState
  );

  getOpfMetadataState(): Observable<OpfPaymentMetadata> {
    return this.opfPaymentMetadataState.asObservable();
  }

  updateOpfMetadata(
    payload: Partial<OpfPaymentMetadata>,
    delay: number = 0
  ): void {
    setTimeout(() => {
      this.opfPaymentMetadataState.next({
        ...this.opfPaymentMetadataState.value,
        ...payload,
      });
    }, delay);
  }

  clearOpfMetadata(): void {
    this.updateOpfMetadata({
      termsAndConditionsChecked: initialState.termsAndConditionsChecked,
      selectedPaymentOptionId: initialState.selectedPaymentOptionId,
      isPaymentInProgress: initialState.isPaymentInProgress,
    });
  }
}
