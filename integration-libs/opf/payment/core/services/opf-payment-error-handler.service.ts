/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  RoutingService,
} from '@spartacus/core';
import {
  OpfPaymentError,
  OpfPaymentErrorType,
  opfDefaultPaymentError,
} from '@spartacus/opf/payment/root';

@Injectable({ providedIn: 'root' })
export class OpfPaymentErrorHandlerService {
  protected globalMessageService = inject(GlobalMessageService);
  protected routingService = inject(RoutingService);

  protected displayError(error: OpfPaymentError | undefined): void {
    this.globalMessageService.add(
      {
        key: error?.message ? error.message : opfDefaultPaymentError.message,
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected handleBadRequestError(errorType?: string): string {
    let message = opfDefaultPaymentError.message;
    switch (errorType) {
      case OpfPaymentErrorType.EXPIRED:
        message = 'opfPayment.errors.cardExpired';
        break;
      case OpfPaymentErrorType.INSUFFICIENT_FUNDS:
      case OpfPaymentErrorType.CREDIT_LIMIT:
        message = 'opfPayment.errors.insufficientFunds';
        break;
      case OpfPaymentErrorType.INVALID_CARD:
      case OpfPaymentErrorType.INVALID_CVV:
        message = 'opfPayment.errors.invalidCreditCard';
        break;
      case OpfPaymentErrorType.LOST_CARD:
        message = 'opfPayment.errors.cardReportedLost';
        break;
    }
    return message;
  }

  handlePaymentError(
    error: OpfPaymentError | undefined,
    returnPath?: string
  ): void {
    let message = opfDefaultPaymentError.message;
    if (error?.status === HttpResponseStatus.BAD_REQUEST) {
      message = this.handleBadRequestError(error?.type);
    } else {
      if (error?.type === OpfPaymentErrorType.PAYMENT_CANCELLED) {
        message = 'opfPayment.errors.cancelPayment';
      }
    }
    this.displayError(error ? { ...error, message } : undefined);
    if (returnPath?.length) {
      this.routingService.go({ cxRoute: returnPath });
    }
  }
}
