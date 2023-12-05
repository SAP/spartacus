/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GlobalMessageService,
  GlobalMessageType,
  StateWithGlobalMessage,
  Translatable,
} from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import { OpfPaymentMetadata } from '../model';
import { OpfPaymentMetadataStoreService } from './opf-payment-metadata-store.service';

@Injectable({
  providedIn: 'root',
})
export class OpfGlobalMessageService extends GlobalMessageService {
  protected opfPaymentMetadataStoreService = inject(
    OpfPaymentMetadataStoreService
  );

  constructor(protected store: Store<StateWithGlobalMessage>) {
    super(store);
  }
  /**
   * Add one message into store
   * @param text: string | Translatable
   * @param type: GlobalMessageType object
   * @param timeout: number
   */
  add(
    text: string | Translatable,
    type: GlobalMessageType,
    timeout?: number
  ): void {
    this.opfPaymentMetadataStoreService
      .getOpfMetadataState()
      .pipe(
        take(1),
        filter(
          (opfPaymentMetadata: OpfPaymentMetadata) =>
            opfPaymentMetadata.isQuickBuyPaymentInProgress === false
        )
      )
      .subscribe(() => {
        super.add(text, type, timeout);
      });
  }
}
