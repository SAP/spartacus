/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  RoutingService,
} from '@spartacus/core';
import {
  OpfPaymentError,
  PaymentErrorType,
  defaultError,
} from '@spartacus/opf/payment/root';

@Injectable({ providedIn: 'root' })
export class OpfPaymentErrorHandlerService {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {}

  protected displayError(error: OpfPaymentError | undefined): void {
    this.globalMessageService.add(
      {
        key: error?.message ? error.message : defaultError.message,
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected handleBadRequestError(errorType?: string): string {
    let message = defaultError.message;
    switch (errorType) {
      case PaymentErrorType.EXPIRED:
        message = 'opfPayment.errors.cardExpired';
        break;
      case PaymentErrorType.INSUFFICENT_FUNDS:
      case PaymentErrorType.CREDIT_LIMIT:
        message = 'opfPayment.errors.insufficientFunds';
        break;
      case PaymentErrorType.INVALID_CARD:
      case PaymentErrorType.INVALID_CVV:
        message = 'opfPayment.errors.invalidCreditCard';
        break;
      case PaymentErrorType.LOST_CARD:
        message = 'opfPayment.errors.cardReportedLost';
        break;
    }
    return message;
  }

  handlePaymentError(
    error: OpfPaymentError | undefined,
    returnPath?: string
  ): void {
    let message = defaultError.message;
    if (error?.status === HttpResponseStatus.BAD_REQUEST) {
      message = this.handleBadRequestError(error?.type);
    } else {
      if (error?.type === PaymentErrorType.PAYMENT_CANCELLED) {
        message = 'opfPayment.errors.cancelPayment';
      }
    }
    this.displayError(error ? { ...error, message } : undefined);
    if (returnPath?.length) {
      this.routingService.go({ cxRoute: returnPath });
    }
  }
}
