/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorModel } from '@spartacus/core';

export interface OpfRenderPaymentMethodEvent {
  isLoading: boolean;
  isError: boolean;
  renderType?: OpfPaymentMethodType | null;
  data?: string | null;
}

export enum OpfPaymentMethodType {
  DESTINATION = 'DESTINATION',
  DYNAMIC_SCRIPT = 'DYNAMIC_SCRIPT',
}

export interface OpfPaymentMetadata {
  termsAndConditionsChecked: boolean;
  selectedPaymentOptionId: number | undefined;
  isPaymentInProgress: boolean;
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export type MerchantCallback = (
  response?: SubmitResponse
) => void | Promise<void>;

export interface GlobalOpfPaymentMethods {
  submit?(options: {
    cartId: string;
    additionalData: Array<KeyValuePair>;
    submitSuccess: MerchantCallback;
    submitPending: MerchantCallback;
    submitFailure: MerchantCallback;
    paymentMethod: PaymentMethod;
  }): Promise<boolean>;
}

export interface PaymentBrowserInfo {
  acceptHeader?: string;
  colorDepth?: number;
  javaEnabled?: boolean;
  javaScriptEnabled?: boolean;
  language?: string;
  screenHeight?: number;
  screenWidth?: number;
  userAgent?: string;
  timeZoneOffset?: number;
  ipAddress?: string;
  originUrl?: string;
}

export interface SubmitRequest {
  browserInfo?: PaymentBrowserInfo;
  paymentMethod?: string;
  encryptedToken?: string;
  cartId?: string;
  channel?: string;
  additionalData?: Array<KeyValuePair>;
}

export interface SubmitInput {
  additionalData: Array<KeyValuePair>;
  paymentSessionId: string;
  cartId: string;
  callbackArray: [MerchantCallback, MerchantCallback, MerchantCallback];
  returnPath?: Array<string>;
  paymentMethod: PaymentMethod;
}

export interface PaymentError extends HttpErrorModel {
  /**
   * The type of error message for further clarity, lower case with underscore eg validation_failure
   */
  type: string;
  /**
   * The description of the error and, in some cases, a solution to the API consumer to resolve the issue.
   */
  message: string;
  /**
   * An error can occur for multiple reasons, or it can be specified in more detail using a more precise error.
   */
  details?: Array<PaymentErrorDetails>;
  moreInfo?: string;
  checkoutValidationMessage?: string;
}

export interface ValidationFailedProduct {
  productId?: string;
  quantity?: number;
  maxQuantity?: number;
  minQuantity?: number;
}
export interface MoreInfo {
  validationFailedProducts?: Array<ValidationFailedProduct>;
  maxQuantity?: number;
  currentOrderAmount?: number;
  minOrderAmount?: number;
}
export interface PaymentErrorDetails {
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
  moreInfo?: string | MoreInfo;
}

export enum SubmitStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  DELAYED = 'DELAYED',
}
export enum PaymentMethod {
  APPLE_PAY = 'APPLE_PAY',
  CREDIT_CARD = 'CREDIT_CARD',
  GOOGLE_PAY = 'GOOGLE_PAY',
}
export interface SubmitResponse {
  cartId?: string;
  status?: SubmitStatus;
  reasonCode?: string;
  paymentMethod: PaymentMethod;
  authorizedAmount?: number;

  customFields?: Array<KeyValuePair>;
}

export interface SubmitCompleteRequest {
  paymentSessionId?: string;
  additionalData?: Array<KeyValuePair>;
  cartId?: string;
  otpKey?: string;
}
