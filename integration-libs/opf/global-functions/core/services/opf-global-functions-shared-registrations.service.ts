/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef, inject } from '@angular/core';
import {
  OpfPaymentGlobalMethods,
  OpfPaymentSessionData,
  OpfPaymentUpdateConfig,
} from '@spartacus/opf/payment/root';
import {
  OpfGlobalFunctionsSharedService,
  OpfSharedPaymentSubmitCompleteOptions,
  OpfSharedPaymentSubmitOptions,
} from './opf-global-functions-shared.service';

@Injectable()
export class OpfGlobalFunctionsSharedRegistrationsService {
  protected sharedService = inject(OpfGlobalFunctionsSharedService);

  registerSubmit(
    container: OpfPaymentGlobalMethods,
    paymentSessionId?: string,
    vcr?: ViewContainerRef
  ): void {
    container.submit = (
      options: OpfSharedPaymentSubmitOptions
    ): Promise<boolean> =>
      this.sharedService.submit(options, paymentSessionId, vcr);
  }

  registerSubmitComplete(
    container: OpfPaymentGlobalMethods,
    paymentSessionId?: string,
    vcr?: ViewContainerRef
  ): void {
    container.submitComplete = (
      options: OpfSharedPaymentSubmitCompleteOptions
    ): Promise<boolean> =>
      this.sharedService.submitComplete(options, paymentSessionId, vcr);
  }

  registerUpdatePaymentTransaction(
    container: OpfPaymentGlobalMethods,
    updatePaymentTransaction: (
      updatePaymentConfig: OpfPaymentUpdateConfig
    ) => Promise<OpfPaymentSessionData>
  ): void {
    container.updatePaymentTransaction = updatePaymentTransaction;
  }
}
