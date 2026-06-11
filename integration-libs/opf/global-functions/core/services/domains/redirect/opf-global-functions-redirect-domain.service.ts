/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { OpfKeyValueMap, OpfPage } from '@spartacus/opf/base/root';
import { OpfPaymentMerchantCallback } from '@spartacus/opf/payment/root';
import { OpfGlobalFunctionsSharedService } from '../../opf-global-functions-shared.service';

@Injectable()
export class OpfGlobalFunctionsRedirectDomainService {
  protected sharedService = inject(OpfGlobalFunctionsSharedService);

  getRedirectParams(paramsMap: Array<OpfKeyValueMap> = []) {
    return paramsMap.map((p) => {
      return { key: p.key, value: p.value };
    });
  }

  submitCompleteRedirect(
    additionalData: Array<OpfKeyValueMap>,
    callbacks: {
      onSuccess: OpfPaymentMerchantCallback;
      onPending: OpfPaymentMerchantCallback;
      onFailure: OpfPaymentMerchantCallback;
      onCancel?: OpfPaymentMerchantCallback;
    },
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): Promise<boolean> {
    return this.sharedService.runSubmitComplete(
      additionalData,
      callbacks,
      paymentSessionId,
      OpfPage.CHECKOUT_REVIEW_PAGE,
      vcr
    );
  }
}
