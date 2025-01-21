/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorModel } from '@spartacus/core';

export const opfDefaultPaymentError: OpfPaymentError = {
  statusText: 'Payment Error',
  message: 'opfPayment.errors.proceedPayment',
  status: -1,
  type: '',
};

export interface OpfPaymentError extends HttpErrorModel {
  /**
   * The type of error message for further clarity, lower case with underscore eg validation_failure
   */
  type?: string;
  /**
   * The description of the error and, in some cases, a solution to the API consumer to resolve the issue.
   */
  message: string;
  /**
   * An error can occur for multiple reasons, or it can be specified in more detail using a more precise error.
   */
  details?: Array<OpfPaymentErrorDetails>;
  moreInfo?: string;
  checkoutValidationMessage?: string;
}

export interface OpfPaymentErrorValidationFailedProduct {
  productId?: string;
  quantity?: number;
  maxQuantity?: number;
  minQuantity?: number;
}
export interface OpfPaymentErrorMoreInfo {
  validationFailedProducts?: Array<OpfPaymentErrorValidationFailedProduct>;
  maxQuantity?: number;
  currentOrderAmount?: number;
  minOrderAmount?: number;
}
export interface OpfPaymentErrorDetails {
  /**
   * The specific payload attribute or query parameter causing the error.
   */
  field?: string;
  /**
   * Classification of the error detail type, lower case with underscore eg missing_value,
   * this value must be always interpreted in context of the general error type.
   */
  type: string;
  /**
   * The description of the error and, in some cases, a solution to the API consumer to resolve the issue.
   */
  message?: string;
  moreInfo?: string | OpfPaymentErrorMoreInfo;
}

export const enum OpfPaymentErrorType {
  EXPIRED = 'EXPIRED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  CREDIT_LIMIT = 'CREDIT_LIMIT',
  INVALID_CARD = 'INVALID_CARD',
  INVALID_CVV = 'INVALID_CVV',
  LOST_CARD = 'LOST_CARD',
  PAYMENT_REJECTED = 'PAYMENT_REJECTED',
  PAYMENT_CANCELLED = 'PAYMENT_CANCELLED',
  STATUS_NOT_RECOGNIZED = 'STATUS_NOT_RECOGNIZED',
}
