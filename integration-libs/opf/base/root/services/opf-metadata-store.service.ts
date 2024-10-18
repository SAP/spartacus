/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpfMetadataModel } from '../model/opf-metadata-store.model';

const initialState: OpfMetadataModel = {
  termsAndConditionsChecked: false,
  selectedPaymentOptionId: undefined,
  isPaymentInProgress: false,
  paymentSessionId: undefined,
};

@Injectable({ providedIn: 'root' })
export class OpfMetadataStoreService {
  opfMetadataState = new BehaviorSubject<OpfMetadataModel>(initialState);

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
    this.opfMetadataState.next(initialState);
  }
}
