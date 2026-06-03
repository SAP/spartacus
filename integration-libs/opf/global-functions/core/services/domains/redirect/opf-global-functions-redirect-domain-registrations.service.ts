/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { OpfKeyValueMap } from '@spartacus/opf/base/root';
import { OpfRegisterGlobalFunctionsInput } from '@spartacus/opf/global-functions/root';
import {
  OpfPaymentGlobalMethods,
  OpfPaymentMerchantCallback,
} from '@spartacus/opf/payment/root';
import { OpfGlobalFunctionsRedirectDomainService } from './opf-global-functions-redirect-domain.service';

@Injectable()
export class OpfGlobalFunctionsRedirectDomainRegistrationsService {
  protected domainService = inject(OpfGlobalFunctionsRedirectDomainService);

  registerAll(
    container: OpfPaymentGlobalMethods,
    { paymentSessionId, vcr, paramsMap }: OpfRegisterGlobalFunctionsInput
  ): void {
    if (!paymentSessionId) {
      return;
    }
    this.registerSubmitCompleteRedirect(container, paymentSessionId, vcr);
    this.registerGetRedirectParams(container, paramsMap ?? []);
  }

  protected registerGetRedirectParams(
    container: OpfPaymentGlobalMethods,
    paramsMap: Array<OpfKeyValueMap> = []
  ): void {
    container.getRedirectParams = () =>
      this.domainService.getRedirectParams(paramsMap);
  }

  protected registerSubmitCompleteRedirect(
    container: OpfPaymentGlobalMethods,
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
    container.submitCompleteRedirect = ({
      additionalData,
      submitSuccess = (): void => {
        // this is intentional
      },
      submitPending = (): void => {
        // this is intentional
      },
      submitFailure = (): void => {
        // this is intentional
      },
      submitCancel = (): void => {
        // this is intentional
      },
    }: {
      cartId: string;
      additionalData: Array<OpfKeyValueMap>;
      submitSuccess: OpfPaymentMerchantCallback;
      submitPending: OpfPaymentMerchantCallback;
      submitFailure: OpfPaymentMerchantCallback;
      submitCancel?: OpfPaymentMerchantCallback;
    }): Promise<boolean> => {
      return this.domainService.submitCompleteRedirect(
        additionalData,
        {
          onSuccess: submitSuccess,
          onPending: submitPending,
          onFailure: submitFailure,
          onCancel: submitCancel,
        },
        paymentSessionId,
        vcr
      );
    };
  }
}
